import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import apiService from '../services/api';

interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  points: number;
  maxCompletions: number;
  type: 'once' | 'daily' | 'limited';
  action: string;
  link?: string;
  category: string;
  completions: number;
  completed: boolean;
  lastCompleted?: string;
  canComplete: boolean;
  actionClicked?: boolean;
}

interface AirdropData {
  totalPoints: number;
  currentTier: string;
  tasks: Task[];
  lastUpdated: string;
}

interface SpinnerStatus {
  spinsToday: number;
  maxSpinsPerDay: number;
  canSpin: boolean;
  reason?: string;
  lastSpin?: string;
  nextReset?: string;
}

interface AirdropContextType {
  airdropData: AirdropData;
  spinnerStatus: SpinnerStatus;
  loading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  spinDailySpinner: () => Promise<{ points: number; description: string }>;
  refreshSpinnerStatus: () => Promise<void>;
}

const AirdropContext = createContext<AirdropContextType | undefined>(undefined);

export const useAirdrop = () => {
  const context = useContext(AirdropContext);
  if (context === undefined) {
    throw new Error('useAirdrop must be used within an AirdropProvider');
  }
  return context;
};

interface AirdropProviderProps {
  children: ReactNode;
}

export const AirdropProvider: React.FC<AirdropProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [airdropData, setAirdropData] = useState<AirdropData>({
    totalPoints: 0,
    currentTier: 'Newcomer',
    tasks: [],
    lastUpdated: new Date().toISOString(),
  });
  const [spinnerStatus, setSpinnerStatus] = useState<SpinnerStatus>({
    spinsToday: 0,
    maxSpinsPerDay: 3,
    canSpin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tasks and user data when user changes
  useEffect(() => {
    if (user) {
      refreshTasks();
      refreshSpinnerStatus();
    }
  }, [user]);

  const refreshTasks = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const [tasksResponse, progressResponse] = await Promise.all([
        apiService.getTasks(),
        apiService.getTaskProgress(),
      ]);

      if (tasksResponse.status === 'success' && progressResponse.status === 'success' && tasksResponse.data && progressResponse.data) {
        const tasks = tasksResponse.data.tasks;
        const progress = progressResponse.data.taskProgress;

        // Merge task data with progress data
        const mergedTasks = tasks.map((task: any) => {
          const taskProgress = progress.find((p: any) => p.taskId === task.taskId);
          return {
            id: task.taskId, // Add id field for compatibility
            ...task,
            completions: taskProgress?.completions || 0,
            completed: taskProgress?.completed || false,
            lastCompleted: taskProgress?.lastCompleted,
            canComplete: taskProgress?.canComplete || false,
            actionClicked: false, // Initialize actionClicked
          };
        });

        setAirdropData({
          totalPoints: progressResponse.data!.totalPoints,
          currentTier: progressResponse.data!.currentTier,
          tasks: mergedTasks,
          lastUpdated: new Date().toISOString(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId: string) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.completeTask(taskId);
      if (response.status === 'success' && response.data) {
        // Update the specific task
        setAirdropData(prev => ({
          ...prev,
          totalPoints: response.data!.totalPoints,
          tasks: prev.tasks.map(task => {
            if (task.taskId === taskId) {
              return {
                ...task,
                completions: response.data!.taskCompletion.completions,
                completed: response.data!.taskCompletion.completed,
                lastCompleted: new Date().toISOString(),
                canComplete: false,
              };
            }
            return task;
          }),
          lastUpdated: new Date().toISOString(),
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete task');
    } finally {
      setLoading(false);
    }
  };

  const spinDailySpinner = async (): Promise<{ points: number; description: string }> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.spinDailySpinner();
      if (response.status === 'success' && response.data) {
        const { spinResult, totalPoints, spinsToday } = response.data;
        
        // Update airdrop data
        setAirdropData(prev => ({
          ...prev,
          totalPoints,
          lastUpdated: new Date().toISOString(),
        }));

        // Update spinner status
        setSpinnerStatus(prev => ({
          ...prev,
          spinsToday,
          lastSpinTime: new Date().toISOString(),
        }));

        return {
          points: spinResult.points,
          description: spinResult.description,
        };
      }
      throw new Error('Failed to spin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to spin daily spinner');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshSpinnerStatus = async () => {
    if (!user) return;

    try {
      const response = await apiService.getSpinnerStatus();
      if (response.status === 'success' && response.data) {
        setSpinnerStatus(prev => ({
          ...prev,
          spinsToday: response.data!.spinsToday,
          canSpin: response.data!.canSpin,
          lastSpin: response.data!.lastSpinTime,
        }));
      }
    } catch (err) {
      console.error('Failed to refresh spinner status:', err);
    }
  };

  const value: AirdropContextType = {
    airdropData,
    spinnerStatus,
    loading,
    error,
    refreshTasks,
    completeTask,
    spinDailySpinner,
    refreshSpinnerStatus,
  };

  return (
    <AirdropContext.Provider value={value}>
      {children}
    </AirdropContext.Provider>
  );
};

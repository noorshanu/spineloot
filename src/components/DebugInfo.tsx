import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useAirdrop } from '../contexts/AirdropContext';

const DebugInfo = () => {
  const { user, loading: userLoading, error: userError } = useUser();
  const { airdropData, loading: airdropLoading, error: airdropError } = useAirdrop();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div className="space-y-1">
        <div>User Loading: {userLoading ? 'Yes' : 'No'}</div>
        <div>User Error: {userError || 'None'}</div>
        <div>User: {user ? 'Connected' : 'Not Connected'}</div>
        <div>Airdrop Loading: {airdropLoading ? 'Yes' : 'No'}</div>
        <div>Airdrop Error: {airdropError || 'None'}</div>
        <div>Total Points: {airdropData?.totalPoints || 0}</div>
        <div>Tasks: {airdropData?.tasks?.length || 0}</div>
      </div>
    </div>
  );
};

export default DebugInfo;

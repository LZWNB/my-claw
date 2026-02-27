import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  UserPlus, 
  Share2, 
  Clock, 
  TrendingUp, 
  Globe, 
  Users, 
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

// Types
interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'studying';
  currentLesson: string;
  streak: number;
  level: number;
}

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
}

// Mock Data
const friendsData: Friend[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'SC', status: 'online', currentLesson: 'Spanish Basics', streak: 45, level: 12 },
  { id: '2', name: 'Mike Johnson', avatar: 'MJ', status: 'studying', currentLesson: 'French Grammar', streak: 32, level: 8 },
  { id: '3', name: 'Emma Wilson', avatar: 'EW', status: 'online', currentLesson: 'Japanese Kanji', streak: 67, level: 15 },
  { id: '4', name: 'David Kim', avatar: 'DK', status: 'offline', currentLesson: 'German Vocabulary', streak: 21, level: 6 },
  { id: '5', name: 'Lisa Anderson', avatar: 'LA', status: 'online', currentLesson: 'Italian Phrases', streak: 89, level: 18 },
  { id: '6', name: 'Tom Brown', avatar: 'TB', status: 'studying', currentLesson: 'Korean Alphabet', streak: 15, level: 4 },
];

const friendRequests: FriendRequest[] = [
  { id: '1', name: 'Alex Rivera', avatar: 'AR', mutualFriends: 3 },
  { id: '2', name: 'Jessica Lee', avatar: 'JL', mutualFriends: 5 },
];

// Components
const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#101922] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#137fec] flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">LinguaAI</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#137fec] dark:hover:text-[#137fec] transition-colors">Learn</a>
            <a href="#" className="text-[#137fec] font-medium">Social</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#137fec] dark:hover:text-[#137fec] transition-colors">Practice</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#137fec] dark:hover:text-[#137fec] transition-colors">Leaderboard</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">12</span>
            </div>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#137fec] to-blue-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#137fec] hover:ring-offset-2 dark:hover:ring-offset-[#101922] transition-all">
              <span className="text-sm font-medium text-white">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Invite Friends Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#137fec] to-blue-600 p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold mb-2">Invite Friends</h3>
          <p className="text-sm text-blue-100 mb-4">Learn together and earn bonus XP when they join!</p>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#137fec] rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            <Share2 className="w-4 h-4" />
            Share Invite
          </button>
        </div>
      </div>

      {/* My Stats Card */}
      <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Stats</h3>
        
        <div className="space-y-4">
          {/* Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">15</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* Streak */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">12 days</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* Weekly Progress */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
              </div>
              <span className="text-sm font-semibold text-[#137fec]">4.5h / 7h</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-[64%] bg-gradient-to-r from-[#137fec] to-blue-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const FriendCard: React.FC<{ friend: Friend }> = ({ friend }) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    studying: 'bg-[#137fec]'
  };

  const statusLabels = {
    online: 'Online',
    offline: 'Offline',
    studying: 'Studying'
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-[#137fec] dark:hover:border-[#137fec] transition-all hover:shadow-lg dark:hover:shadow-blue-900/20">
      <div className="flex items-start gap-4">
        {/* Avatar with Status */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">{friend.avatar}</span>
          </div>
          <div className={`absolute bottom-0 right-0 w-4 h-4 ${statusColors[friend.status]} rounded-full border-2 border-white dark:border-[#1a2632]`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 dark:text-white truncate">{friend.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              friend.status === 'online' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              friend.status === 'studying' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {statusLabels[friend.status]}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">{friend.currentLesson}</p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{friend.streak}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lvl {friend.level}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FriendRequestCard: React.FC<{ request: FriendRequest }> = ({ request }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#137fec] to-blue-600 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">{request.avatar}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">{request.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{request.mutualFriends} mutual friends</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-[#137fec] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            Accept
          </button>
          <button className="px-4 py-2 bg-white dark:bg-[#1a2632] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#101922] border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#137fec] flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">LinguaAI</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 LinguaAI. Learn languages together.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#137fec] transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#137fec] transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#137fec] transition-colors">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
const SocialPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'leaderboard'>('friends');

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Social Hub</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Connect with friends and learn together</p>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#137fec] text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                <UserPlus className="w-5 h-5" />
                Add Friend
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
              <button
                onClick={() => setActiveTab('friends')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'friends'
                    ? 'bg-[#137fec] text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Users className="w-4 h-4" />
                Friends
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">6</span>
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'requests'
                    ? 'bg-[#137fec] text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Bell className="w-4 h-4" />
                Requests
                <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">2</span>
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'leaderboard'
                    ? 'bg-[#137fec] text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Global
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'friends' && (
              <div className="space-y-4">
                {/* Friend Requests Notification */}
                {friendRequests.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#137fec]" />
                      Friend Requests ({friendRequests.length})
                    </h3>
                    <div className="space-y-3">
                      {friendRequests.map(request => (
                        <FriendRequestCard key={request.id} request={request} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Friends Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">All Friends</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {friendsData.map(friend => (
                      <FriendCard key={friend.id} friend={friend} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Pending Requests</h3>
                <div className="space-y-3">
                  {friendRequests.map(request => (
                    <FriendRequestCard key={request.id} request={request} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-[#137fec]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Leaderboard</h3>
                  <p className="text-gray-500 dark:text-gray-400">Compete with learners worldwide. Coming soon!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SocialPage;

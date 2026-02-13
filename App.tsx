import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { User, Lot, Bid, DashboardStats } from './types';
import { Home, Search, PlusCircle, Gavel, User as UserIcon, Bell, ChevronRight, ArrowLeft, Camera, ShieldCheck, MapPin, Phone, Building2, FileText, Globe, Trash2, Edit3, Plus, CheckCircle2, Info, Eye, EyeOff, Check, TrendingUp, ShoppingBag, Target, Settings2, UploadCloud, Calendar, DollarSign, Image as ImageIcon, Star, X } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'otp' | 'register' | 'main' | 'lot-detail' | 'create-membership' | 'create-lot'>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        const hasToken = localStorage.getItem('adb_token');
        if (hasToken) {
           setUser({
             id: '1',
             email: 'john.doe@example.com',
             firstName: 'John',
             lastName: 'Doe',
             phoneNumber: '+1234567890',
             hasMembership: true,
             membershipInfo: {
               status: 'ACTIVE',
               type: 'INDIVIDUAL',
               memberSince: '2023-12-01'
             }
           });
           setCurrentScreen('main');
        } else {
          setCurrentScreen('login');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentScreen('otp');
    }, 1000);
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('adb_token', 'mock_jwt_token');
      setUser({
        id: '1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
        hasMembership: false
      });
      setCurrentScreen('main');
    }, 1000);
  };

  const handleViewLot = (lot: Lot) => {
    setSelectedLot(lot);
    setCurrentScreen('lot-detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-orange-500 text-white p-8">
            <div className="w-24 h-24 bg-white/20 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-2xl backdrop-blur-sm">
                <Gavel size={48} strokeWidth={2.5} className="text-white" />
            </div>
            <div className="text-4xl font-extrabold mb-1">ADB<span className="opacity-80">Auction</span></div>
            <div className="text-sm tracking-[0.3em] uppercase opacity-60 font-medium">Marketplace</div>
            <div className="mt-20 w-10 h-10 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        );

      case 'login':
        return (
          <div className="flex flex-col h-full bg-white p-8 justify-center">
            <div className="mb-12 text-center">
              <div className="inline-flex bg-orange-100 text-orange-600 p-4 rounded-3xl mb-6 shadow-inner">
                <Gavel size={32} strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome</h1>
              <p className="text-slate-500 mt-2 font-medium">Log in to your auction account</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-medium"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center active:scale-[0.98]"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Log In'}
              </button>
            </form>
            <div className="my-10 flex items-center gap-4 text-slate-300">
              <hr className="flex-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest">or continue with</span>
              <hr className="flex-1" />
            </div>
            <div className="flex gap-4">
              <button className="w-full border border-slate-100 py-3.5 rounded-2xl font-semibold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition active:scale-95">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
                Google
              </button>
            </div>
            <p className="mt-10 text-center text-sm text-slate-500 font-medium">
              Don't have an account? <button onClick={() => setCurrentScreen('register')} className="text-orange-500 font-bold ml-1 underline-offset-4 hover:underline">Create Account</button>
            </p>
          </div>
        );

      case 'otp':
        return (
          <div className="flex flex-col h-full bg-white p-8 justify-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Verification</h1>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">We've sent a 6-digit code to your email <span className="text-orange-600 font-semibold">john.doe@...</span></p>
            <div className="flex gap-2.5 mb-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input 
                  key={i} 
                  type="text" 
                  maxLength={1} 
                  className="w-full aspect-[4/5] text-center text-2xl font-bold border-2 border-slate-100 bg-slate-50 text-slate-900 rounded-2xl focus:border-orange-400 focus:bg-white focus:outline-none transition-all" 
                  defaultValue={i === 1 ? '7' : ''}
                />
              ))}
            </div>
            <button 
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 active:scale-[0.98]"
            >
              {loading ? 'Verifying...' : 'Complete Verification'}
            </button>
            <button className="mt-8 text-slate-500 text-sm font-bold w-full">
              Didn't receive code? <span className="text-orange-500 ml-1">Resend in 58s</span>
            </button>
          </div>
        );

      case 'register':
        return <RegisterScreen onBack={() => setCurrentScreen('login')} onRegisterSuccess={() => setCurrentScreen('login')} />;

      case 'main':
        return (
          <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'home' && <HomeScreen user={user!} onApplyMembership={() => setCurrentScreen('create-membership')} />}
            {activeTab === 'catalogue' && <CatalogueScreen onViewLot={handleViewLot} />}
            {activeTab === 'sell' && <SellScreen user={user!} onCreateLot={() => setCurrentScreen('create-lot')} onApplyMembership={() => setCurrentScreen('create-membership')} />}
            {activeTab === 'bids' && <MyBidsScreen />}
            {activeTab === 'account' && <AccountScreen user={user!} onLogout={() => {
              localStorage.removeItem('adb_token');
              setCurrentScreen('login');
              setUser(null);
            }} onApplyMembership={() => setCurrentScreen('create-membership')} />}
          </Layout>
        );

      case 'lot-detail':
        return <LotDetailScreen lot={selectedLot!} onBack={() => setCurrentScreen('main')} />;

      case 'create-membership':
        return <CreateMembershipScreen onBack={() => setCurrentScreen('main')} onBypass={() => setCurrentScreen('create-lot')} />;

      case 'create-lot':
        return <CreateLotScreen onBack={() => setCurrentScreen('main')} />;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-[#fdfaf5] flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-md h-full bg-white relative overflow-hidden shadow-2xl border border-slate-100 md:rounded-[3rem]">
        {renderScreen()}
      </div>
    </div>
  );
}

// --- SUB-SCREENS ---

function HomeScreen({ user, onApplyMembership }: { user: User, onApplyMembership: () => void }) {
  const marketActivity = {
    "selling": {
      "totalLots": 0,
      "activeLots": 0,
      "totalBidsReceived": 0,
      "lotsSold": 0,
      "lotsUnsold": 0,
      "highestBidOnActiveLots": null
    },
    "buying": {
      "totalBidsPlaced": 0,
      "activeBids": 0,
      "outbidCount": 0,
      "lotsWon": 0,
      "lotsSubscribed": 0
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {!user.hasMembership && (
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2rem] p-6 flex flex-col gap-4 shadow-xl shadow-orange-200">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Sell Your Assets</h4>
              <p className="text-orange-100 text-xs font-medium">Apply for membership to list and sell items. Bidding is open to all!</p>
            </div>
          </div>
          <button onClick={onApplyMembership} className="bg-white text-orange-600 w-full py-3 rounded-2xl text-sm font-bold shadow-lg active:scale-[0.97] transition-all">Become a Member</button>
        </div>
      )}
      
      {user.membershipInfo?.status === 'ACTIVE' && (
        <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
               <ShieldCheck size={20} className="text-emerald-500" />
             </div>
             <div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Type</div>
               <div className="text-sm font-bold text-slate-800">Verified Member</div>
             </div>
          </div>
          <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">Active</div>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-6 px-1 border-b border-slate-100 pb-2">
           <h2 className="text-xl font-black text-slate-900 tracking-tight">Market Activity</h2>
           <div className="p-2 bg-orange-50 rounded-xl">
             <TrendingUp size={16} className="text-orange-500" />
           </div>
        </div>
        
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
                <Gavel size={14} className="text-orange-500" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Selling</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <StatCard label="Total Lots" value={marketActivity.selling.totalLots} />
                <StatCard label="Active Lots" value={marketActivity.selling.activeLots} color="text-orange-500" />
                <StatCard label="Bids Received" value={marketActivity.selling.totalBidsReceived} />
                <StatCard label="Lots Sold" value={marketActivity.selling.lotsSold} />
                <StatCard label="Lots Unsold" value={marketActivity.selling.lotsUnsold} />
                <StatCard label="Highest Bid" value={marketActivity.selling.highestBidOnActiveLots ? `$${marketActivity.selling.highestBidOnActiveLots.toLocaleString()}` : '--'} />
            </div>
        </div>

        <div>
            <div className="flex items-center gap-2 mb-4 px-1">
                <ShoppingBag size={14} className="text-blue-500" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Buying</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <StatCard label="Bids Placed" value={marketActivity.buying.totalBidsPlaced} />
                <StatCard label="Active Bids" value={marketActivity.buying.activeBids} color="text-blue-500" />
                <StatCard label="Outbid Count" value={marketActivity.buying.outbidCount} color={marketActivity.buying.outbidCount > 0 ? "text-rose-500" : "text-slate-900"} />
                <StatCard label="Lots Won" value={marketActivity.buying.lotsWon} />
                <StatCard label="Subscribed" value={marketActivity.buying.lotsSubscribed} />
            </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Live Bids</h2>
          <button className="text-slate-400 text-xs font-bold hover:text-orange-500 transition-colors">See History</button>
        </div>
        <div className="space-y-4">
          {[
            { id: '1', lot: 'A001', title: 'Farm Tractor 2020 Series', amount: 2500, bidder: 'John D.', time: '2m ago', color: 'orange' },
            { id: '2', lot: 'A003', title: 'Industrial Generator Pack', amount: 840, bidder: 'Sarah K.', time: '15m ago', color: 'emerald' },
          ].map(bid => (
            <div key={bid.id} className="bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${bid.id === '1' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {bid.bidder[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 truncate max-w-[140px]">{bid.title}</span>
                  <span className="text-[10px] font-bold text-slate-400">LOT #{bid.lot} • {bid.bidder}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-black text-slate-900">${bid.amount}</div>
                <div className="text-[10px] text-orange-500 font-bold uppercase">{bid.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, color = "text-slate-900" }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="bg-white p-4 rounded-[1.8rem] border border-slate-50 shadow-sm flex flex-col gap-1">
      <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{label}</div>
      <div className={`text-xl font-black ${color}`}>{value}</div>
    </div>
  );
}

function RegisterScreen({ onBack, onRegisterSuccess }: { onBack: () => void, onRegisterSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const calculateStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9]/.test(password)) s += 25;
    if (/[^A-Za-z0-9]/.test(password)) s += 25;
    return s;
  };

  const strength = calculateStrength();
  const strengthText = strength <= 25 ? 'Weak' : strength <= 50 ? 'Medium' : strength <= 75 ? 'Strong' : 'Very Strong';
  const strengthColor = strength <= 25 ? 'bg-rose-500' : strength <= 50 ? 'bg-orange-500' : strength <= 75 ? 'bg-yellow-500' : 'bg-emerald-500';

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'taken@example.com') {
      setEmailError('This Email Is Already Taken');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto hide-scrollbar">
      <header className="px-6 h-18 py-6 flex items-center gap-6 sticky top-0 bg-white z-10 border-b border-slate-50">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 active:scale-90 transition-all">
            <ArrowLeft size={20} strokeWidth={2.5}/>
        </button>
        <h1 className="font-black text-xl tracking-tight text-slate-900">Create Your Account</h1>
      </header>

      <div className="p-8 space-y-8">
        <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Join ADBAuction</h2>
            <p className="text-slate-500 font-medium">Please fill in your details to start bidding.</p>
        </div>

        <button className="w-full border border-slate-100 py-4 rounded-2xl font-bold text-slate-700 flex items-center justify-center gap-3 hover:bg-slate-50 transition active:scale-95 shadow-sm">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
            Continue with Google
        </button>

        <div className="flex items-center gap-4 text-slate-200">
            <hr className="flex-1" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">or use email</span>
            <hr className="flex-1" />
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">First Name *</label>
              <input 
                type="text" 
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold"
                placeholder="John"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Last Name *</label>
              <input 
                type="text" 
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email *</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              className={`w-full px-5 py-4 rounded-2xl border ${emailError ? 'border-rose-400 bg-rose-50' : 'border-slate-100 bg-slate-50'} text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold`}
              placeholder="john.doe@example.com"
            />
            {emailError && <div className="flex items-center gap-1.5 text-rose-500 text-[10px] font-bold mt-1 ml-1 animate-in fade-in slide-in-from-top-1"><Info size={12}/> {emailError}</div>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
            <div className="relative">
              <input 
                type="tel" 
                required
                className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold"
                placeholder="+233 24 123 4567"
              />
              <Phone className="absolute left-4 top-4 text-slate-300" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password *</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold"
                placeholder="••••••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {password && (
              <div className="space-y-2 px-1">
                <div className="flex gap-1 h-1.5">
                  <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 25 ? strengthColor : 'bg-slate-100'}`}></div>
                  <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 50 ? strengthColor : 'bg-slate-100'}`}></div>
                  <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 75 ? strengthColor : 'bg-slate-100'}`}></div>
                  <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 100 ? strengthColor : 'bg-slate-100'}`}></div>
                </div>
                <div className="text-[10px] font-bold text-slate-400">Strength: <span className={strength > 25 ? 'text-slate-700' : ''}>{strengthText}</span></div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50 space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-slate-100 p-1.5 rounded-lg"><Info size={14} className="text-slate-400"/></div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Additional Details</h3>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1 opacity-70">Street Address</label>
              <input 
                type="text" 
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold"
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1 opacity-70">City</label>
                <input 
                    type="text" 
                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold"
                    placeholder="Accra"
                />
                </div>
                <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1 opacity-70">Country</label>
                <div className="relative">
                    <select className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-bold appearance-none">
                        <option>Ghana</option>
                        <option>Nigeria</option>
                        <option>USA</option>
                        <option>UK</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-4 text-slate-400 rotate-90" size={18} />
                </div>
                </div>
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center shadow-slate-200"
            >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Create Account'}
            </button>
            <p className="text-center text-sm text-slate-500 font-medium">
              Already have an account? <button type="button" onClick={onBack} className="text-orange-500 font-bold ml-1 hover:underline underline-offset-4">Log In</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function CatalogueScreen({ onViewLot }: { onViewLot: (lot: Lot) => void }) {
  const mockLots: Lot[] = [
    {
      id: '1',
      lotNumber: 'A001',
      title: 'Kubota Farm Tractor 2020 L-Series',
      description: 'Well-maintained farm tractor with low hours. Service records available. Recently overhauled engine and new hydraulic pumps installed.',
      status: 'Active',
      startingPrice: 15000,
      currentBid: 18500,
      totalBids: 12,
      auctionStartDate: '2024-01-01',
      auctionEndDate: '2024-02-15T15:00:00',
      primaryImageUrl: 'https://images.unsplash.com/photo-1594913785162-e67853823cd1?auto=format&fit=crop&q=80&w=400',
      imageUrls: [
        'https://images.unsplash.com/photo-1594913785162-e67853823cd1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1595039838779-f31393633e5b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1533411440263-547cc32623e1?auto=format&fit=crop&q=80&w=800'
      ],
      specifications: {
        "Engine Hours": "450 hrs",
        "Horsepower": "45 HP",
        "Drive": "4WD",
        "Fuel Type": "Diesel",
        "Condition": "Excellent",
        "Last Service": "Dec 2023"
      },
      isFeatured: true,
      sellerId: 's1',
      sellerName: 'Global Heavy Equip'
    },
    {
      id: '2',
      lotNumber: 'A002',
      title: 'Vintage Mustang 1967 Fastback',
      description: 'Fully restored classic car. Candy apple red with black leather interior. Matching numbers, original blocks. Restoration completed over 2 years with authentic parts.',
      status: 'Active',
      startingPrice: 45000,
      currentBid: 52000,
      totalBids: 8,
      auctionStartDate: '2024-01-01',
      auctionEndDate: '2024-02-18T18:00:00',
      primaryImageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400',
      imageUrls: [
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1612465133501-8178822002f2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'
      ],
      specifications: {
        "VIN": "6R07K100001",
        "Engine": "289 V8",
        "Transmission": "4-Speed Manual",
        "Color": "Candy Apple Red",
        "Mileage": "12,400 (Restored)",
        "Year": "1967"
      },
      sellerId: 's2',
      sellerName: 'Classic Motors'
    },
    {
      id: '3',
      lotNumber: 'A003',
      title: 'Industrial Caterpillar Excavator',
      description: 'Used heavy excavator in good working condition. 4500 operating hours. Tracks at 80% life. All seals replaced in previous maintenance cycle.',
      status: 'Active',
      startingPrice: 35000,
      currentBid: 38200,
      totalBids: 5,
      auctionStartDate: '2024-01-01',
      auctionEndDate: '2024-02-12T12:00:00',
      primaryImageUrl: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&q=80&w=400',
      imageUrls: [
        'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1541625602330-2277a4c4b282?auto=format&fit=crop&q=80&w=800'
      ],
      specifications: {
        "Model": "320D L",
        "Operating Weight": "22,000 kg",
        "Hours": "4,500 hrs",
        "Bucket Cap": "1.2 m³",
        "Boom Length": "5.7 m"
      },
      isMixedLot: true,
      sellerId: 's3',
      sellerName: 'Industrial Group'
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="space-y-5 sticky top-0 bg-[#fcfaf7]/90 backdrop-blur-md pb-4 pt-2 z-10 px-1">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors pointer-events-none" size={18} />
            <input 
              type="text" 
              placeholder="Search items, trucks..." 
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all font-medium text-slate-900 placeholder-slate-400 h-[60px]"
            />
          </div>
          <button className="bg-orange-500 text-white w-[60px] h-[60px] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-90 transition-all shrink-0">
            <PlusCircle size={24} />
          </button>
        </div>
        
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
          {['Recommended', 'Vehicles', 'Industrial', 'Electronics', 'Jewelry'].map((cat, idx) => (
            <button 
              key={cat} 
              className={`px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap shadow-sm transition-all border ${
                idx === 0 ? 'bg-orange-500 text-white border-orange-500 shadow-orange-200' : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockLots.map(lot => (
          <div 
            key={lot.id} 
            onClick={() => onViewLot(lot)}
            className="bg-white rounded-[2.5rem] border border-slate-50 overflow-hidden shadow-xl shadow-slate-200/30 flex flex-col active:scale-[0.97] transition-all group"
          >
            <div className="h-56 relative overflow-hidden">
              <img src={lot.primaryImageUrl} alt={lot.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 left-4 flex gap-2">
                {lot.isFeatured && <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg">Featured</span>}
                {lot.isMixedLot && <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg">Mixed</span>}
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 px-3 py-2 rounded-2xl text-[10px] font-black shadow-xl">
                2d 14h left
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Lot #{lot.lotNumber}</span>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/50?u=${i+lot.id}`} /></div>)}
                </div>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 line-clamp-1 leading-tight">{lot.title}</h3>
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl border border-slate-100/50">
                <div>
                  <span className="text-slate-400 text-[9px] uppercase font-black tracking-widest block mb-1">Current Bid</span>
                  <span className="text-xl font-black text-slate-900">${lot.currentBid.toLocaleString()}</span>
                </div>
                <button className="bg-orange-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 active:scale-90 transition-all">
                  <ChevronRight size={24} strokeWidth={3}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LotDetailScreen({ lot, onBack }: { lot: Lot, onBack: () => void }) {
  const [currentBid, setCurrentBid] = useState(lot.currentBid);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bidValue, setBidValue] = useState(lot.currentBid + 100);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setCurrentBid(prev => prev + 50);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white relative animate-in slide-in-from-right duration-300">
      {/* Header Buttons */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <button onClick={onBack} className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 active:scale-90 transition-all">
          <ArrowLeft size={24} className="text-slate-900" strokeWidth={2.5} />
        </button>
        <div className="flex gap-3">
          <button onClick={() => setIsSubscribed(!isSubscribed)} className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 active:scale-90 transition-all">
            <Bell size={22} className={isSubscribed ? 'text-orange-500 fill-orange-500' : 'text-slate-400'} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Multi-Image Carousel */}
        <div className="h-[45vh] bg-slate-200 relative group overflow-hidden">
          <div 
            className="flex transition-transform duration-500 h-full" 
            style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
          >
            {lot.imageUrls.map((url, i) => (
              <img key={i} src={url} className="w-full h-full object-cover shrink-0" alt={`${lot.title} - view ${i + 1}`} />
            ))}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Dots Indicator */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-10">
            {lot.imageUrls.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImageIndex(i)}
                className={`h-1.5 rounded-full transition-all ${activeImageIndex === i ? 'w-6 bg-white shadow-lg' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8 bg-white rounded-t-[3rem] -mt-12 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] bg-orange-50 px-3 py-1.5 rounded-xl">Lot #{lot.lotNumber}</span>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase">Active Live</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">{lot.title}</h1>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <MapPin size={16} className="text-orange-500"/> Listed from {lot.sellerName}
            </div>
            <p className="text-slate-500 text-base leading-relaxed font-medium pt-2 border-t border-slate-50">{lot.description}</p>
          </div>

          <div className="bg-[#fcfaf7] rounded-[2.5rem] p-6 flex flex-col gap-6 shadow-inner border border-slate-100">
             <div className="flex justify-between items-end">
               <div className="flex flex-col gap-1">
                 <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Current Bid</span>
                 <span className="text-4xl font-black text-slate-900">${currentBid.toLocaleString()}</span>
               </div>
               <div className="text-right">
                 <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest block mb-1">Time Left</span>
                 <div className="text-orange-600 font-black text-xl bg-orange-50 px-4 py-1.5 rounded-2xl shadow-sm">02:15:30</div>
               </div>
             </div>
          </div>

          {/* Specifications Section */}
          {lot.specifications && (
            <section className="space-y-6">
              <div className="flex items-center gap-2 px-1">
                <Settings2 size={18} className="text-orange-500" />
                <h2 className="text-2xl font-black text-slate-900">Specifications</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(lot.specifications).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-1 group hover:border-orange-200 transition-colors">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{key}</span>
                    <span className="text-sm font-bold text-slate-900 break-words">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bid History Section */}
          <section className="pb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Bid History</h2>
            <div className="space-y-6">
              {[
                { bidder: 'James Carter', amount: 18500, time: '2m ago', rating: 4.9 },
                { bidder: 'Sarah Miller', amount: 18450, time: '15m ago', rating: 4.8 },
                { bidder: 'Lucas Bennett', amount: 18000, time: '1h ago', rating: 5.0 },
              ].map((bid, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-[1.2rem] bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${bid.bidder}`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-base font-black text-slate-900">{bid.bidder}</div>
                      <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                         ★ {bid.rating} • {bid.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-black text-slate-900 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">${bid.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-100 p-6 shrink-0 flex gap-4 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] z-20">
        <div className="flex-1 space-y-2">
          <div className="relative">
             <input 
               type="number" 
               value={bidValue}
               onChange={(e) => setBidValue(Number(e.target.value))}
               className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] py-4.5 pl-10 pr-4 font-black text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all h-[56px]"
             />
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-10 py-4.5 rounded-[1.5rem] font-black shadow-2xl shadow-orange-500/30 active:scale-[0.96] transition-all flex items-center justify-center h-[56px]">
          Place Bid
        </button>
      </div>
    </div>
  );
}

function SellScreen({ user, onCreateLot, onApplyMembership }: { user: User, onCreateLot: () => void, onApplyMembership: () => void }) {
  if (!user.hasMembership || user.membershipInfo?.status !== 'ACTIVE') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-[#fdfcf9]">
        <div className="w-28 h-28 bg-orange-100 text-orange-600 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
          <PlusCircle size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Ready to start selling?</h2>
        <p className="text-slate-500 mb-10 font-medium leading-relaxed max-w-xs mx-auto">Listing and selling items requires a verified Seller Membership. Bidding remains free for all members.</p>
        <button onClick={onApplyMembership} className="w-full bg-orange-500 text-white py-5 rounded-[2rem] font-bold shadow-2xl shadow-orange-500/30 active:scale-95 transition-all">Apply for Membership</button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-2 px-1">
        <h1 className="text-3xl font-black text-slate-900">My Shop</h1>
        <button onClick={onCreateLot} className="bg-orange-500 text-white p-3.5 rounded-2xl shadow-xl shadow-orange-500/25 active:scale-90 transition-all">
          <PlusCircle size={26} strokeWidth={2.5} />
        </button>
      </div>
      
      <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-2">
        {['Live Lots', 'Drafts', 'Sold Items', 'Archive'].map((status, i) => (
          <button key={status} className={`px-6 py-3 rounded-2xl text-xs font-black whitespace-nowrap border transition-all ${i === 0 ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200' : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'}`}>
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {[
          { id: '1', title: 'Mini Excavator 302.7 CR Series', status: 'Active', bids: 24, price: 12500, img: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b282?auto=format&fit=crop&q=80&w=200' },
        ].map(lot => (
          <div key={lot.id} className="bg-white rounded-[2rem] border border-slate-50 p-4 flex gap-5 shadow-xl shadow-slate-200/20 active:scale-[0.98] transition-all group">
            <div className="relative overflow-hidden rounded-2xl">
                <img src={lot.img} className="w-28 h-28 object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${lot.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{lot.status}</span>
                <h3 className="font-extrabold text-slate-900 text-base mt-2 leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">{lot.title}</h3>
              </div>
              <div className="flex justify-between items-end border-t border-slate-50 pt-3">
                <span className="text-lg font-black text-slate-900">${lot.price.toLocaleString()}</span>
                <div className="text-[10px] text-orange-600 font-black bg-orange-50 px-2 py-1 rounded-lg">{lot.bids} OFFERS</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyBidsScreen() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-black text-slate-900 mb-2">My Offers</h1>
      <div className="space-y-6">
        {[
          { lot: 'B012', title: 'Vintage Speed Boat 1990', myBid: 4200, highBid: 4200, status: 'Active', time: 'Ends in 5h', img: 'https://images.unsplash.com/photo-1544203117-920f83658d4a?auto=format&fit=crop&q=80&w=200' },
        ].map((bid, i) => (
          <div key={i} className="bg-white rounded-[2rem] border border-slate-50 p-4 flex gap-5 shadow-xl shadow-slate-200/20 active:scale-[0.98] transition-all group">
            <div className="relative rounded-2xl overflow-hidden shrink-0">
                <img src={bid.img} className="w-24 h-24 object-cover" alt="" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
               <div className="flex justify-between items-start">
                 <span className="text-[9px] font-black text-orange-500 uppercase">LOT #{bid.lot}</span>
                 <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase">{bid.status}</span>
               </div>
               <h3 className="font-extrabold text-slate-900 text-base leading-tight truncate group-hover:text-orange-500 transition-colors">{bid.title}</h3>
               <div className="flex justify-between items-center mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                  <span className="text-sm font-black text-slate-900">${bid.myBid}</span>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <span className="text-sm font-black text-slate-900">${bid.highBid}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountScreen({ user, onLogout, onApplyMembership }: { user: User, onLogout: () => void, onApplyMembership: () => void }) {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center mt-4">
        <div className="w-28 h-28 bg-gradient-to-br from-orange-400 to-orange-600 p-1.5 rounded-[2.5rem] shadow-2xl relative mb-6">
            <div className="w-full h-full bg-white rounded-[2.2rem] flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${user.id}`} className="w-full h-full object-cover" />
            </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900">{user.firstName} {user.lastName}</h2>
        <p className="text-slate-500 text-sm font-bold mt-2">{user.phoneNumber}</p>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl text-white relative overflow-hidden">
        <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between">
               <h3 className="font-black text-lg">Seller Status</h3>
               <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl uppercase ${user.membershipInfo?.status === 'ACTIVE' ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white/60'}`}>
                {user.membershipInfo?.status || 'GUEST'}
              </span>
            </div>
            {!user.hasMembership && (
              <button onClick={onApplyMembership} className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 active:scale-95 transition-all">Become a Verified Member</button>
            )}
        </div>
      </div>

      <div className="space-y-4">
        {[
          { icon: <UserIcon size={20} className="text-orange-500"/>, label: 'Profile Settings' },
          { icon: <Gavel size={20} className="text-orange-500"/>, label: 'Bidding Hub' },
          { icon: <Bell size={20} className="text-orange-500"/>, label: 'Alert Preferences' },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-50 shadow-sm group active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">{item.icon}</div>
              <span className="text-base font-black text-slate-700">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>
        ))}
      </div>

      <button onClick={onLogout} className="w-full py-5 text-orange-600 font-black bg-orange-50 border border-orange-100 rounded-[2rem] active:bg-orange-100 transition-all">Sign Out Securely</button>
    </div>
  );
}

function CreateMembershipScreen({ onBack, onBypass }: { onBack: () => void, onBypass: () => void }) {
  const [membershipType, setMembershipType] = useState<'INDIVIDUAL' | 'CORPORATEBODY'>('INDIVIDUAL');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep(4);
    }, 1500);
  };

  const InputField = ({ label, placeholder, type = "text", required = false }: any) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">{label} {required && "*"}</label>
      <input type={type} required={required} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder={placeholder} />
    </div>
  );

  const FileUpload = ({ label, required = false }: any) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">{label} {required && "*"}</label>
      <div className="w-full border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer">
        <UploadCloud className="text-slate-400" size={24} />
        <span className="text-xs font-bold text-slate-500">Tap to upload document</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="px-6 h-18 py-4 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white/95 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => step > 1 && step < 4 ? setStep(step - 1) : onBack()} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 active:scale-90 transition-all shadow-sm">
            <ArrowLeft size={20} strokeWidth={2.5}/>
        </button>
        <div className="flex flex-col items-center">
            <h1 className="font-black text-lg tracking-tight text-slate-900">Application</h1>
            {step < 4 && <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Step {step} of 3</span>}
        </div>
        <div className="w-10"></div>
      </header>
      
      <div className="flex-1 overflow-y-auto hide-scrollbar p-8 pb-24">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900">Member Type</h2>
                <p className="text-slate-500 text-sm font-medium">Select how you want to participate.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => setMembershipType('INDIVIDUAL')} className={`p-6 rounded-[2.5rem] text-left border-4 transition-all ${membershipType === 'INDIVIDUAL' ? 'bg-orange-50 border-orange-500' : 'bg-white border-slate-50'}`}>
                <UserIcon size={32} className="mb-4 text-orange-500" />
                <h3 className="font-black text-xl text-slate-900">Individual</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">For personal auction participation, buying, and casual selling.</p>
              </button>
              <button onClick={() => setMembershipType('CORPORATEBODY')} className={`p-6 rounded-[2.5rem] text-left border-4 transition-all ${membershipType === 'CORPORATEBODY' ? 'bg-slate-900 border-orange-500 shadow-2xl' : 'bg-white border-slate-50'}`}>
                <Building2 size={32} className={`mb-4 ${membershipType === 'CORPORATEBODY' ? 'text-white' : 'text-slate-400'}`} />
                <h3 className={`font-black text-xl ${membershipType === 'CORPORATEBODY' ? 'text-white' : 'text-slate-900'}`}>Corporate Body</h3>
                <p className={`text-xs font-medium leading-relaxed ${membershipType === 'CORPORATEBODY' ? 'text-slate-400' : 'text-slate-500'}`}>For registered businesses, dealers, and high-volume organizations.</p>
              </button>
            </div>
            <div className="pt-4 space-y-4">
              <button onClick={() => setStep(2)} className="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl active:scale-95 transition-all">Next: Contacts</button>
              <button onClick={onBypass} className="w-full py-4 text-orange-500 font-bold bg-orange-50 rounded-2xl active:scale-95 transition-all">Skip and Create Lot as Guest</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
             <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900">Contact Info</h2>
                <p className="text-slate-500 text-sm font-medium">How can we reach you?</p>
            </div>
            <div className="space-y-4">
                <InputField label="Primary Contact" placeholder="+1..." required />
                <InputField label="Secondary Contact" placeholder="+1..." />
            </div>
            <button onClick={() => setStep(3)} className="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] mt-4 shadow-2xl active:scale-95 transition-all">Next: Verification</button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-right duration-300">
            <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900">Verification</h2>
                <p className="text-slate-500 text-sm font-medium">Fill in the official details for your account.</p>
            </div>

            {membershipType === 'CORPORATEBODY' ? (
              <div className="space-y-5">
                <InputField label="Organization Name" placeholder="e.g. Acme Corp" required />
                <InputField label="Business Type" placeholder="e.g. Retail, Logistics" required />
                <InputField label="Business Registration #" placeholder="123456789" required />
                <InputField label="Business Address" placeholder="Street number and name" required />
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="City" placeholder="City" required />
                    <InputField label="Country" placeholder="Country" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="State / Province" placeholder="State" />
                    <InputField label="Postal Code" placeholder="00000" />
                </div>
                <InputField label="Business Phone" placeholder="+1..." required />
                <InputField label="Website" placeholder="https://..." />
                <FileUpload label="Authorized Representative ID" required />
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">National ID Type *</label>
                  <select required className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white appearance-none">
                    <option>Passport</option>
                    <option>National ID Card</option>
                    <option>Driver's License</option>
                  </select>
                </div>
                <FileUpload label="National ID Document" required />
                <FileUpload label="Proof of Address" required />
              </div>
            )}

            <div className="pt-8 space-y-6">
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed px-1">By submitting, you agree to our <span className="text-orange-500 underline">Terms of Membership</span> and acknowledge that all information provided is accurate.</p>
                <div className="space-y-4">
                  <button type="submit" className="w-full py-5 bg-orange-500 text-white font-black rounded-[2rem] shadow-2xl flex items-center justify-center active:scale-95 transition-all">
                      {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Submit Application'}
                  </button>
                  <button type="button" onClick={onBypass} className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl active:scale-95 transition-all">
                     Bypass and Create Lot Now
                  </button>
                </div>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-16 space-y-6 animate-in zoom-in duration-700 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mb-4">
                <CheckCircle2 size={56} className="text-emerald-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Application Received</h2>
            <p className="text-slate-500 px-6 font-medium leading-relaxed">Our verification team will review your application. This usually takes 24-48 business hours.</p>
            <button onClick={onBack} className="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] mt-10 active:scale-95 transition-all shadow-xl">Return to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateLotScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [lotForm, setLotForm] = useState({
    title: '',
    description: '',
    lotNumber: '',
    startingPrice: '',
    reservePrice: '',
    buyItNowPrice: '',
    startDate: '',
    endDate: ''
  });

  const [items, setItems] = useState<any[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemTypeTab, setItemTypeTab] = useState<'NEW' | 'EXISTING'>('NEW');
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [primaryImageId, setPrimaryImageId] = useState<string | null>(null);

  const [itemForm, setItemForm] = useState({
      category: 'Vehicles',
      productType: 'Cars',
      title: '',
      description: '',
      condition: 'New',
      conditionNotes: '',
      quantity: 1,
      displayOrder: 1,
      dynamicFields: {} as Record<string, any>
  });

  const handleAddItem = () => {
    setItems([...items, { ...itemForm, id: Date.now().toString() }]);
    setIsAddingItem(false);
    // Reset item form
    setItemForm({
      category: 'Vehicles',
      productType: 'Cars',
      title: '',
      description: '',
      condition: 'New',
      conditionNotes: '',
      quantity: 1,
      displayOrder: items.length + 2,
      dynamicFields: {}
    });
  };

  const handleImageUpload = () => {
    const newImg = {
      id: Date.now().toString(),
      url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=400`,
      caption: ''
    };
    const updated = [...uploadedImages, newImg];
    setUploadedImages(updated);
    if (!primaryImageId) setPrimaryImageId(newImg.id);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Lot Details
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black text-slate-900">Lot Details</h2>
            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Auction Title *</label>
                  <input value={lotForm.title} onChange={e => setLotForm({...lotForm, title: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="e.g. 2020 Heavy Machinery Pack" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Detailed Description</label>
                  <textarea value={lotForm.description} onChange={e => setLotForm({...lotForm, description: e.target.value})} className="w-full px-5 py-4 rounded-3xl border border-slate-100 bg-slate-50 text-slate-900 font-medium h-32 resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all" placeholder="Tell bidders about this lot..." />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Lot Number (Optional)</label>
                  <input value={lotForm.lotNumber} onChange={e => setLotForm({...lotForm, lotNumber: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white" placeholder="LOT-2024-000001" />
               </div>
            </div>
          </div>
        );
      case 2: // Pricing
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black text-slate-900">Pricing</h2>
            <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Starting Price</label>
                  <div className="relative">
                    <input type="number" value={lotForm.startingPrice} onChange={e => setLotForm({...lotForm, startingPrice: e.target.value})} className="w-full pl-10 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-black focus:bg-white h-[56px]" placeholder="0.00" />
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Reserve Price (Hidden)</label>
                  <div className="relative">
                    <input type="number" value={lotForm.reservePrice} onChange={e => setLotForm({...lotForm, reservePrice: e.target.value})} className="w-full pl-10 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-black focus:bg-white h-[56px]" placeholder="0.00" />
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Buy It Now Price</label>
                  <div className="relative">
                    <input type="number" value={lotForm.buyItNowPrice} onChange={e => setLotForm({...lotForm, buyItNowPrice: e.target.value})} className="w-full pl-10 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-black focus:bg-white h-[56px]" placeholder="0.00" />
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl flex gap-3">
                   <Info size={18} className="text-orange-500 shrink-0 mt-0.5" />
                   <p className="text-xs text-orange-700 font-medium leading-relaxed">Reserve price is hidden from bidders. Buy It Now lets buyers purchase immediately at a fixed price.</p>
                </div>
            </div>
          </div>
        );
      case 3: // Schedule
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black text-slate-900">Schedule</h2>
            <div className="space-y-5">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Auction Start Date</label>
                  <div className="relative">
                    <input type="datetime-local" value={lotForm.startDate} onChange={e => setLotForm({...lotForm, startDate: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white h-[56px]" />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Auction End Date</label>
                  <div className="relative">
                    <input type="datetime-local" value={lotForm.endDate} onChange={e => setLotForm({...lotForm, endDate: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 font-bold focus:bg-white h-[56px]" />
                  </div>
               </div>
               <p className="text-center text-[10px] font-bold text-slate-400">Leave dates blank to set them later before publishing.</p>
            </div>
          </div>
        );
      case 4: // Items
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">Lot Items</h2>
              <button onClick={() => setIsAddingItem(true)} className="bg-orange-500 text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-all"><Plus size={24} strokeWidth={3} /></button>
            </div>
            
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center opacity-30 text-center">
                   <ShoppingBag size={48} className="mb-4" />
                   <p className="font-black uppercase text-xs tracking-widest">No items added yet</p>
                   <p className="text-[10px] font-medium mt-1">A lot must have at least 1 item</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={item.id} className="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black">{idx + 1}</div>
                        <div>
                           <h4 className="font-black text-slate-900">{item.title}</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase">{item.category} • {item.productType} • {item.condition}</p>
                        </div>
                     </div>
                     <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center"><Trash2 size={18} /></button>
                  </div>
                ))
              )}
            </div>

            {items.length > 1 && (
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                  <Info size={18} className="text-blue-500 shrink-0" />
                  <p className="text-[10px] text-blue-800 font-bold leading-relaxed uppercase tracking-wider">This lot has multiple items and will be listed as a "Mixed Lot"</p>
               </div>
            )}

            {isAddingItem && (
               <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[120] flex items-end p-6">
                  <div className="bg-white w-full max-w-md mx-auto rounded-t-[3rem] -mb-6 p-8 pb-12 space-y-6 animate-in slide-in-from-bottom duration-500 overflow-y-auto max-h-[90vh] hide-scrollbar">
                     <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black text-slate-900">Add Item</h3>
                        <button onClick={() => setIsAddingItem(false)} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
                     </div>

                     <div className="flex bg-slate-100 p-1 rounded-2xl">
                        <button onClick={() => setItemTypeTab('NEW')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${itemTypeTab === 'NEW' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500'}`}>New Product</button>
                        <button onClick={() => setItemTypeTab('EXISTING')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${itemTypeTab === 'EXISTING' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500'}`}>Link Existing</button>
                     </div>

                     {itemTypeTab === 'NEW' ? (
                       <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Category</label>
                                <select value={itemForm.category} onChange={e => setItemForm({...itemForm, category: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold">
                                   <option>Vehicles</option>
                                   <option>Machinery</option>
                                   <option>Electronics</option>
                                </select>
                             </div>
                             <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Type</label>
                                <select value={itemForm.productType} onChange={e => setItemForm({...itemForm, productType: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold">
                                   <option>Cars</option>
                                   <option>Trucks</option>
                                   <option>Motorcycles</option>
                                </select>
                             </div>
                          </div>
                          <div>
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Product Title *</label>
                             <input value={itemForm.title} onChange={e => setItemForm({...itemForm, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold" placeholder="Item Name" />
                          </div>
                          <div>
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Condition</label>
                             <select value={itemForm.condition} onChange={e => setItemForm({...itemForm, condition: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold">
                                {['New', 'Like New', 'Excellent Used', 'Good', 'Fair', 'Poor', 'Refurbished', 'For Parts', 'Vintage', 'Antique'].map(c => <option key={c}>{c}</option>)}
                             </select>
                          </div>
                          <div className="pt-4 border-t border-slate-100">
                             <div className="flex items-center gap-2 mb-4">
                                <Settings2 size={14} className="text-orange-500" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specifications</h4>
                             </div>
                             <div className="space-y-4">
                                <div>
                                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Make</label>
                                   <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold" placeholder="e.g. Toyota" />
                                </div>
                                <div>
                                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Model</label>
                                   <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold" placeholder="e.g. Hilux" />
                                </div>
                             </div>
                          </div>
                          <button onClick={handleAddItem} className="w-full py-5 bg-orange-500 text-white font-black rounded-3xl shadow-xl active:scale-95 transition-all">Add to Lot</button>
                       </div>
                     ) : (
                       <div className="space-y-6 py-4">
                          <div className="relative">
                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                             <input className="w-full pl-11 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold" placeholder="Search my products..." />
                          </div>
                          <div className="space-y-3">
                             {[1,2].map(i => (
                               <button key={i} onClick={() => { setItemForm({...itemForm, title: `Saved Item ${i}`}); setItemTypeTab('NEW'); }} className="w-full p-4 border border-slate-100 rounded-2xl text-left flex items-center gap-4 hover:border-orange-500 transition-colors">
                                  <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0"></div>
                                  <div className="flex-1">
                                     <h5 className="font-black text-sm">Stored Engine Part #{i}</h5>
                                     <p className="text-[10px] font-bold text-slate-400 uppercase">Mechanical • Spare</p>
                                  </div>
                               </button>
                             ))}
                          </div>
                       </div>
                     )}
                  </div>
               </div>
            )}
          </div>
        );
      case 5: // Images
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black text-slate-900">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
               {uploadedImages.map(img => (
                  <div key={img.id} className="relative aspect-square rounded-[2rem] overflow-hidden group border-4 border-white shadow-lg">
                     <img src={img.url} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                        <button onClick={() => setPrimaryImageId(img.id)} className={`p-2 rounded-xl transition-all ${primaryImageId === img.id ? 'bg-orange-500 text-white' : 'bg-white text-slate-900'}`}><Star size={18} fill={primaryImageId === img.id ? "currentColor" : "none"} /></button>
                        <button onClick={() => setUploadedImages(uploadedImages.filter(i => i.id !== img.id))} className="p-2 bg-rose-500 text-white rounded-xl"><Trash2 size={18}/></button>
                     </div>
                     {primaryImageId === img.id && (
                        <div className="absolute top-3 left-3 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-lg">Primary</div>
                     )}
                  </div>
               ))}
               <button onClick={handleImageUpload} className="aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-orange-500 hover:bg-orange-50 transition-all active:scale-95">
                  <Camera size={32} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Add Photo</span>
               </button>
            </div>
            <p className="text-center text-[10px] font-bold text-slate-400 leading-relaxed">Upload clear photos from multiple angles. Tap star to set listing thumbnail.</p>
          </div>
        );
      case 6: // Review
        return (
          <div className="space-y-8 animate-in zoom-in duration-500 pb-10">
             <h2 className="text-2xl font-black text-slate-900">Review Auction</h2>
             
             <div className="space-y-6">
                <section className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                   <span className="text-[8px] uppercase font-black text-slate-400 tracking-[0.2em] block mb-2">Live Preview</span>
                   <h3 className="text-xl font-black leading-tight mb-4">{lotForm.title || "Untitled Auction"}</h3>
                   <div className="flex gap-4 items-end">
                      <div>
                         <span className="text-[8px] text-slate-400 uppercase font-black block mb-1">Start Bid</span>
                         <span className="text-2xl font-black text-orange-500">${Number(lotForm.startingPrice || 0).toLocaleString()}</span>
                      </div>
                      <div className="text-right flex-1">
                         <span className="text-[8px] text-slate-400 uppercase font-black block mb-1">Items</span>
                         <span className="text-lg font-black">{items.length} Units</span>
                      </div>
                   </div>
                </section>

                <div className="grid grid-cols-1 gap-4">
                   <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-orange-500">
                         <Calendar size={14} />
                         <span className="text-[10px] font-black uppercase">Schedule</span>
                      </div>
                      <p className="text-sm font-bold text-slate-700">Starts: {lotForm.startDate || 'Immediate'}</p>
                      <p className="text-sm font-bold text-slate-700">Ends: {lotForm.endDate || 'Not set'}</p>
                   </div>
                   
                   <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-orange-500">
                         <ShoppingBag size={14} />
                         <span className="text-[10px] font-black uppercase">Included Items</span>
                      </div>
                      <div className="space-y-2">
                        {items.map((item, i) => (
                          <div key={i} className="text-sm font-bold text-slate-600 flex justify-between">
                            <span>{item.title}</span>
                            <span className="text-slate-400">{item.condition}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex flex-col gap-4">
                <button onClick={onBack} className="w-full py-5 bg-orange-500 text-white font-black rounded-3xl shadow-xl shadow-orange-200 active:scale-95 transition-all">Publish Auction Live</button>
                <button onClick={onBack} className="w-full py-5 bg-slate-100 text-slate-600 font-black rounded-3xl active:scale-95 transition-all">Save as Draft</button>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <header className="px-6 h-18 py-4 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white sticky top-0 z-[100]">
        <button onClick={() => step > 1 ? setStep(step - 1) : onBack()} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 active:scale-90 transition-all shadow-sm">
            <ArrowLeft size={20} strokeWidth={2.5}/>
        </button>
        <div className="flex flex-col items-center">
            <h1 className="font-black text-lg tracking-tight text-slate-900">New Auction</h1>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Step {step} of 6</span>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-8 pb-32">
        {renderStepContent()}
      </div>

      {step < 6 && (
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-50 p-6 absolute bottom-0 left-0 right-0 z-[100] shadow-[0_-15px_40px_rgba(0,0,0,0.05)]">
            <button 
              onClick={() => {
                if (step === 4 && items.length === 0) {
                  alert("Please add at least one item to this lot.");
                  return;
                }
                setStep(step + 1);
              }} 
              className="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                {step === 4 && items.length === 0 ? "Add Item to Continue" : "Continue"} <ChevronRight size={18} strokeWidth={3} />
            </button>
        </div>
      )}
    </div>
  );
}

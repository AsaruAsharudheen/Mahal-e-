import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home';
import AddVideo from './Admin/AddVideo/addvideo';
import AddImage from './Admin/AddImage/add';
import VideoReelsPage from './Pages/Reels/reels';
import Profile from './Pages/Profile/profile';
import Fund from './Pages/Fund/fund';
import AddFund from './Admin/AddFund/addfund';
import AdminHome from './Admin/AdminHome/adminhome';
import AdminLogin from './Admin/AdminLogin/adminlogin';
import AddNercha from './Admin/AddNercha/addnercha';
import ListNercha from './Admin/ListNercha/listnercha';
import FundList from './Admin/List/fundlist';
import Committee from './Admin/Commitee/Committee';
import CommitteePage from './Pages/CommitteePage/committeepage';
import AdminProfile from './Admin/Adminprofile/adminprofile';
import AdminMedia from './Admin/AdminMedia/adminmedia';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddImage />} />
        <Route path="/addvideo" element={<AddVideo />} />
        <Route path="/reel" element={<VideoReelsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fund" element={<Fund />} />
        <Route path="/addfund" element={<AddFund />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/addnercha" element={<AddNercha />} />
        <Route path="/listnercha" element={<ListNercha />} />
        <Route path="/admin/fundlist" element={<FundList />} />
        <Route path="/admin/committee" element={<Committee />} />
        <Route path="/committee" element={<CommitteePage />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/media" element={<AdminMedia />} />
      </Routes>
    </>
  );
};

export default App;

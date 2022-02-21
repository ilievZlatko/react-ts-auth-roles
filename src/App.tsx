import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import PersistLogin from './components/PersistLogin';

enum ROLES {
  'User' = 2001,
  'Editor' = 1984,
  'Admin' = 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

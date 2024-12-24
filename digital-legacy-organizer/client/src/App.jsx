import { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import AssetList from './components/AssetList';
import AssetForm from './components/AssetForm';
import TrustedContacts from './components/TrustedContacts';
import Loading from './components/Loading';
import './styles/main.css';

function App() {
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
    username: null,
    assets: [],
    contacts: [],
    loading: true,
    error: null
  });

  // Simulated data for testing
  const mockAssets = [
    {
      id: '1',
      title: 'Facebook Account',
      type: 'social',
      username: 'user@example.com',
      password: 'securepass123',
      instructions: 'Please memorialize this account'
    },
    {
      id: '2',
      title: 'Gmail Account',
      type: 'email',
      username: 'user@gmail.com',
      password: 'emailpass456',
      instructions: 'Forward important emails to family'
    }
  ];

  const mockContacts = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      relationship: 'family'
    }
  ];

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setState({
        loading: false,
        assets: mockAssets,
        contacts: mockContacts
      });
    }, 1000);
  }, []);

  const handleLogin = async (username) => {
    setState({ loading: true });
    // Simulate API call
    setTimeout(() => {
      setState({
        username,
        loading: false
      });
    }, 1000);
  };

  const handleAddAsset = async (assetData) => {
    setState({ loading: true });
    // Simulate API call
    setTimeout(() => {
      const newAsset = {
        id: Date.now().toString(),
        ...assetData
      };
      setState({
        assets: [...state.assets, newAsset],
        loading: false
      });
    }, 500);
  };

  const handleDeleteAsset = async (assetId) => {
    setState({
      assets: state.assets.filter(asset => asset.id !== assetId)
    });
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="app">
        <Header 
          username={state.username} 
          onLogout={() => setState({ username: null })} 
        />

        <main className="main-content">
          {state.error && (
            <div className="error-banner">{state.error}</div>
          )}

          {!state.username ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <Routes>
              <Route path="/" element={
                <>
                  <AssetForm onAddAsset={handleAddAsset} />
                  <AssetList 
                    assets={state.assets}
                    onDeleteAsset={handleDeleteAsset}
                    onUpdateAsset={(id, updates) => {
                      setState({
                        assets: state.assets.map(asset => 
                          asset.id === id ? { ...asset, ...updates } : asset
                        )
                      });
                    }}
                  />
                </>
              } />
              <Route path="/contacts" element={
                <TrustedContacts 
                  contacts={state.contacts}
                  onAddContact={(contact) => {
                    setState({
                      contacts: [...state.contacts, { id: Date.now().toString(), ...contact }]
                    });
                  }}
                  onRemoveContact={(id) => {
                    setState({
                      contacts: state.contacts.filter(contact => contact.id !== id)
                    });
                  }}
                />
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
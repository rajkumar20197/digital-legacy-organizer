import { useState } from 'react';
import '../styles/login.css';
import personIcon from '../assets/person.svg';
import infoIcon from '../assets/info.svg';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!username.trim()) {
        throw new Error('Username is required');
      }

      await onLogin(username);
    } catch (err) {
      setError(err.error === 'auth-insufficient' 
        ? 'Invalid credentials' 
        : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-guide">
          <h2>Digital Legacy Organizer</h2>
          <p className="guide-intro">Secure your digital assets for the future</p>
          
          <div className="guide-section">
            <h3>Getting Started:</h3>
            <ul>
              <li>
                <img src={personIcon} alt="" className="guide-icon" />
                <span>Create an account or login</span>
              </li>
              <li>
                <span>Start organizing your digital legacy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
                required
              />
            </div>
            
            {error && (
              <div className="error-message">
                <img src={infoIcon} alt="" className="error-icon" />
                {error}
              </div>
            )}
            
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

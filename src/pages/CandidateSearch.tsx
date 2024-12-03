import { useState } from 'react';
import { searchGithubUser } from '../api/API'; 

interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}

const CandidateSearch: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchGithubUser(username.trim()); 
      console.log(import.meta.env.VITE_GITHUB_TOKEN)
      setCandidate({
        name: data.name || 'No Name Available',
        username: data.login,
        location: data.location || 'Location not available',
        avatar: data.avatar_url,
        email: data.email || 'Email not available',
        html_url: data.html_url,
        company: data.company || 'Company not specified',
      });
    } catch (error) {
      console.error('Error fetching candidate:', error);
      setError('Failed to fetch candidate. Please check the username.');
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidate]));
      alert('Candidate saved!');
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchCandidate} disabled={loading}>
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : candidate ? (
        <div>
          <h2>{candidate.name}</h2>
          <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
          <p>Company: {candidate.company}</p>
          <p>
            Profile: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a>
          </p>
          <button onClick={saveCandidate}>Save Candidate</button>
        </div>
      ) : (
        !loading && <p>No candidate found.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

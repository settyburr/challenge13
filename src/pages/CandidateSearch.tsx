import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import SavedCandidates from './SavedCandidates';

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
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      const token = import.meta.env.VITE_GITHUB_API_TOKEN;
      try {
        const response = await fetch('html/example.url', {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const data = await response.json();
        setCandidate({
          name: data.name,
          username: data.login,
          location: data.location,
          avatar: data.avatar_url,
          email: data.email,
          html_url: data.html_url,
          company: data.company,
        });
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };

    fetchCandidate();
  }, []);

  const savedCandidate = () => {
    if(candidate) {
      const savedCandidate = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...SavedCandidates, candidate]));
      alert('Candidate saved!');
    }
  };
  return (
    <div>
      {candidate ? (
        <div>
          <h1>{candidate.name}</h1>
          <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
          <p>Company: {candidate.company}</p>
          <p>Profile: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a></p>
          <button onClick={saveCandidate}>Save Candidate</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CandidateSearch;

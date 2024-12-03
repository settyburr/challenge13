import React, { useEffect, useState } from 'react';

interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}


const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(savedCandidates);
  }, []);
  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.length > 0 ? (
        <div>
          {candidates.map((candidate, index) => (
            <div key={index}>
              <h2>{candidate.name}</h2>
              <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
              <p>Username: {candidate.username}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
              <p>Company: {candidate.company}</p>
              <p>
                Profile: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved candidates found.</p>
      )}
    </>
  );
};

export default SavedCandidates;

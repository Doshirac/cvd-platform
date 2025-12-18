import { useNavigate } from 'react-router-dom';

export const useNavigateToId = () => {
  const navigate = useNavigate();

  return (id: number) => {
    navigate(`/articles/${id}`);
  };
};

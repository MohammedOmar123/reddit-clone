/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect, useState } from 'react';

import { Stack, Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

import CreatePostLabel from '../CreatePostLabel/CreatePostLabel';
import Post from './Post';
import Loading from '../Loading/Loading';
import { ApiService } from '../../services/ApiServices';
import { IPostProps } from '../../interfaces/IPostProps';
import './style.css';

const PostList: FC = () => {
  const [posts, setPosts] = useState<IPostProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPosts = async ():Promise<void> => {
    try {
      setIsLoading(true);
      const response = await ApiService.get('/posts/');
      setPosts(response.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: 'The server is not responding ',
        icon: 'error',
        text: 'We have some updates, Please try again later',
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    !isLoading
      ? (
        <Box className="post-section">
          <CreatePostLabel />
          <Stack
            spacing={2}
            alignContent="center"
            alignItems="center"
            className="post-list"
          >
            { posts?.map((post:IPostProps) => {
              console.log(post);
              return (
                <Post {...post} />
              );
            })}
          </Stack>
        </Box>
      )
      : <Loading />);
};

export default PostList;

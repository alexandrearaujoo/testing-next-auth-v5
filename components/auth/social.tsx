'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '../ui/button';

export const Social = () => {
  return (
    <article className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => console.log('oi')}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => console.log('oi')}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </article>
  );
};

import React from 'react';
import { render, screen } from '@testing-library/react';
import ReferendumVoting from './o-referendumVoting';

describe('ReferendumVoting', () => {
  // render(<ReferendumVoting />);
  // const linkElement = screen.getByText("Search for a topic...");
  // expect(linkElement).toBeInTheDocument();

    it('Should show all solutions in the discussion', () => {
      render(<ReferendumVoting discussionId="1" />);
      const linkElement = screen.getByText(/No solutions found./);
      expect(linkElement);
    })
});

import { render, screen } from '@testing-library/react';
import { MediaControl } from './media-control';

it('explains when no audio is available', () => {
  render(<MediaControl audioUrl={undefined} label="hello" />);

  expect(
    screen.getByText('Audio is not available for hello.'),
  ).toBeVisible();
});

import { render, screen } from '@testing-library/react';
import { AppShell } from './app-shell';

it('shows the student app name', () => {
  render(<AppShell>Lesson content</AppShell>);

  expect(
    screen.getByRole('banner', { name: 'English Explorer' }),
  ).toBeInTheDocument();
});

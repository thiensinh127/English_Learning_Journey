import { render, screen } from '@testing-library/react';
import { AppShell } from './app-shell';

it('shows the student app name', () => {
  render(<AppShell>Lesson content</AppShell>);

  expect(
    screen.getByRole('banner', { name: 'English Learning Journey' }),
  ).toBeInTheDocument();
});

it('provides student navigation for desktop and mobile layouts', () => {
  render(<AppShell>Lesson content</AppShell>);

  expect(
    screen.getAllByRole('navigation', { name: 'Điều hướng học tập' }),
  ).toHaveLength(2);
});

it('uses the full desktop content area without a blank header', () => {
  const { container } = render(<AppShell>Lesson content</AppShell>);

  expect(screen.getByRole('banner')).toHaveClass('lg:hidden');
  expect(container.querySelector('main')).toHaveClass('lg:max-w-none');
});

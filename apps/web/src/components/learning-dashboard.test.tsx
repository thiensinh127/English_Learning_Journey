import { render, screen } from '@testing-library/react';
import { LearningDashboard } from './learning-dashboard';

it('shows the learning map, next lesson action, and daily missions', () => {
  render(<LearningDashboard />);

  expect(screen.getByRole('region', { name: /bản đồ hành trình học tập/i })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /tiếp tục học/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /nhiệm vụ của an/i }),
  ).toBeInTheDocument();
});

it('keeps the dashboard CTA readable and sized for touch', () => {
  render(<LearningDashboard />);

  expect(screen.getByText('Tiếp tục học', { exact: true })).toHaveClass(
    'min-h-12',
    'font-sans',
  );
});

it('fits the dashboard within the desktop and tablet viewport', () => {
  render(<LearningDashboard />);

  expect(screen.getByRole('region', { name: /bảng điều khiển học tập/i })).toHaveClass(
    'md:h-[calc(100dvh-11rem)]',
    'lg:h-[calc(100dvh-3rem)]',
  );
});

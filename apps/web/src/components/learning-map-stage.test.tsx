import { render, screen } from '@testing-library/react';
import { LearningMapStage } from './learning-map-stage';

it('provides labelled lesson landmarks over the learning map', () => {
  render(<LearningMapStage />);

  expect(
    screen.getByRole('region', { name: 'Bản đồ hành trình học tập' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Từ vựng: My Birthday' })).toHaveAttribute(
    'href',
    '/lessons',
  );
});

it('renders visible, accessible map CTAs instead of relying on text baked into the image', () => {
  render(<LearningMapStage />);

  expect(screen.getByRole('link', { name: 'Tiếp tục học Unit 4: My Birthday' })).toHaveTextContent(
    'Tiếp tục học',
  );
  expect(screen.getByRole('link', { name: 'Nghe & chọn' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Đảo Muôn Loài đang khoá' })).toBeDisabled();
});

it('keeps the map responsive and renders compact checkpoint nodes', () => {
  const { container } = render(<LearningMapStage />);

  const hero = container.querySelector('.relative');

  expect(hero).not.toHaveClass(
    'min-w-[760px]',
  );
  expect(hero).not.toHaveClass('md:h-[calc(100dvh-7rem)]');
  expect(screen.getByRole('link', { name: 'Nghe & chọn' })).toHaveClass('size-16');
  expect(
    screen.getByRole('link', { name: 'Bắt đầu Unit 4: My Birthday trên điện thoại' }),
  ).toHaveClass('sm:hidden');
  expect(screen.queryByText('Kéo bản đồ sang trái hoặc phải để khám phá.')).not.toBeInTheDocument();
});

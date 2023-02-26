import { render } from '@testing-library/react';
import ArticleDetail from '.';

test('renders HomePage by snapshot', () => {
  const { container } = render(<ArticleDetail />);
  expect(container).toMatchInlineSnapshot();
});

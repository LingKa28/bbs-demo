import { render } from '@testing-library/react';
import LayoutPage from '.';

test('renders HomePage by snapshot', () => {
  const { container } = render(<LayoutPage />);
  expect(container).toMatchInlineSnapshot();
});

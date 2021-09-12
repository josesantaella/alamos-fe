import { render } from '@testing-library/react';

import PostPreview from './post-preview';

describe('PostPreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostPreview />);
    expect(baseElement).toBeTruthy();
  });
});

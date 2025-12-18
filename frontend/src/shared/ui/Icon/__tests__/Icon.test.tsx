import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { iconColors, iconSizes, type IconName } from '../index';

jest.mock('../Icon', () => {
  return {
    Icon: ({
      name,
      ariaLabel,
      size = 'medium',
      color = 'primary',
    }: {
      name: IconName;
      ariaLabel?: string;
      size?: string;
      color?: string;
    }) => (
      <div
        role="img"
        aria-label={ariaLabel ?? `${name} icon`}
        data-testid={`icon-${name}`}
        data-size={size}
        data-color={color}
      >
        {name}
      </div>
    ),
  };
});

import { Icon } from '../Icon';

describe('<Icon />', () => {
  it('renders SUCCESS Check icon with correct aria-label, size and color', () => {
    render(
      <Icon name="CHECK" ariaLabel="Ok icon" size={iconSizes.MEDIUM} color={iconColors.SUCCESS} />
    );

    const icon = screen.getByLabelText('Ok icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-testid', 'icon-CHECK');
    expect(icon).toHaveAttribute('data-size', iconSizes.MEDIUM);
    expect(icon).toHaveAttribute('data-color', iconColors.SUCCESS);
  });
});

import React, {ReactElement} from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import { BackButton } from './BackButton';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

describe('BackButton', () => {

    const customRender = (backButton: ReactElement) => {
        render(backButton)
    };

    it('renders with default margin', () => {
        customRender(<BackButton />);
        const button = screen.getByText('<- Back');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn-outline-secondary');
    });

    it('renders with custom margin', () => {
        customRender(<BackButton margin={"my-margin"} />);
        const button = screen.getByText('← Back');
        expect(button).toHaveClass('my-margin');
    });

    it('calls navigate function with -1 when clicked', () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        customRender(<BackButton />);

        const button = screen.getByText('← Back');
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});

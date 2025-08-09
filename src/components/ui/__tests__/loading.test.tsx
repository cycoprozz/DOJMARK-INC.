import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoadingSpinner, LoadingButton, SkeletonCard, PageLoading } from '../loading'

describe('Loading Components', () => {
  describe('LoadingSpinner', () => {
    it('renders with default props', () => {
      render(<LoadingSpinner />)
      
      const spinner = screen.getByRole('img', { hidden: true })
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveStyle({ color: '#F46A25' })
    })

    it('renders with custom size and className', () => {
      render(<LoadingSpinner size={32} className="custom-class" />)
      
      const spinner = screen.getByRole('img', { hidden: true })
      expect(spinner).toHaveClass('custom-class')
    })
  })

  describe('LoadingButton', () => {
    it('renders children when not loading', () => {
      render(
        <LoadingButton isLoading={false}>
          Click me
        </LoadingButton>
      )
      
      expect(screen.getByText('Click me')).toBeInTheDocument()
      expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
    })

    it('shows spinner when loading', () => {
      render(
        <LoadingButton isLoading={true}>
          Click me
        </LoadingButton>
      )
      
      expect(screen.getByText('Click me')).toBeInTheDocument()
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })

    it('calls onClick when not loading and not disabled', () => {
      const handleClick = jest.fn()
      
      render(
        <LoadingButton isLoading={false} disabled={false} onClick={handleClick}>
          Click me
        </LoadingButton>
      )
      
      fireEvent.click(screen.getByText('Click me'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn()
      
      render(
        <LoadingButton isLoading={true} onClick={handleClick}>
          Click me
        </LoadingButton>
      )
      
      fireEvent.click(screen.getByText('Click me'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('applies disabled styles when disabled or loading', () => {
      const { rerender } = render(
        <LoadingButton disabled={true}>
          Click me
        </LoadingButton>
      )
      
      expect(screen.getByRole('button')).toBeDisabled()
      
      rerender(
        <LoadingButton isLoading={true}>
          Click me
        </LoadingButton>
      )
      
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('SkeletonCard', () => {
    it('renders skeleton elements', () => {
      render(<SkeletonCard />)
      
      // Should render skeleton elements (checking by style since they're divs)
      const skeletonElements = document.querySelectorAll('[style*="background: rgba(255, 255, 255, 0.1)"]')
      expect(skeletonElements.length).toBeGreaterThan(0)
    })
  })

  describe('PageLoading', () => {
    it('renders with default message', () => {
      render(<PageLoading />)
      
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders with custom message', () => {
      render(<PageLoading message="Custom loading message" />)
      
      expect(screen.getByText('Custom loading message')).toBeInTheDocument()
    })

    it('includes loading spinner', () => {
      render(<PageLoading />)
      
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    })
  })
})

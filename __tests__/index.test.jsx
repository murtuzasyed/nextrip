import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event';
import Home from '../pages/index';


describe('Home', () => {
  const routes=[{
    label: "Mock Option",
    value: "mockOption"
  }];
  it("renders correctly", () => {
    const { container } = render(<Home routes={routes}/>)
    expect(container).toMatchSnapshot()
  })
  it('renders a heading', () => {
  
    render(<Home routes={routes}/>)

    const heading = screen.getByRole('heading', {
      name: /Next Trip/i,
    })

    expect(heading).toBeInTheDocument()
  });
  it("displays only one option", () => {
    render(<Home routes={routes}/>)
    expect(screen.getAllByRole('option').length).toBe(1);
  });
})
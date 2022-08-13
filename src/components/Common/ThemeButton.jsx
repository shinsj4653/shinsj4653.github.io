import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'

const ThemeButton = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label
          style={{
            width: '100px',
            height: '42px',
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
            border: `2px solid ${theme === 'dark' ? '#fff' : '#333'}`,
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            bottom: '30px',
            right: '100px',
            zIndex: 9,
          }}
        >
          <input
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />{' '}
          {theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
        </label>
      )}
    </ThemeToggler>
  )
}

export default ThemeButton

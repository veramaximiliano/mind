import { useState } from "react"
import './styles.css'

export default function ThemeSwitch({theme, onChangeTheme}) {
    const [active, setActive] = useState(false)
    const themes = ['light', 'dark', 'pink', 'bb-blue', 'yellow']

    return (
        <div className={`theme-switch${active ? ' active' : ''}`}>
            <div className={`theme-switch-option theme-switch-option-${theme}`} onClick = {() => setActive(!active)}>theme-{theme}</div>
            <ul className="theme-switch-options">
            {
                themes.map((t, index) => 
                    t === theme ? (<></>) : (<li key={index} className={`theme-switch-option theme-switch-option-${t}`} onClick = { () => { onChangeTheme(t); setActive(false)} }>theme-{t}</li>)
                )
            }
            </ul>
        </div>
    )
}
import React from "react"
import { NavLink } from "react-router-dom"

export const Sidebar = () => {
  return <div 
    className="box has-background-white-bis	" 
    style={{height:"100%"}}
  >
    <aside className="menu">
      <ul className="menu-list">
        <li>
          <NavLink to="/workspace" activeClassName="is-active">
            Workspaces
          </NavLink>
          <ul>
            <li>
              <NavLink to="/workspace/create" activeClassName="is-active">
                Create
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
}

export default Sidebar

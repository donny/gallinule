import React, { PropTypes } from 'react'

const Picker = ({ value, onChange, options }) => (
  <span>
    <select onChange={e => onChange(e.target.value)}
            value={value}>
      {options.map(option =>
        <option value={option.id} key={option.id}>
          {option.name}
        </option>)
      }
    </select>
  </span>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker

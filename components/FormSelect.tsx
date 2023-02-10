import React from 'react'
import Select from 'react-select';

export default function FormSelect({options, name, placeholder}: {options: {value: string, label: string}[], name: string, placeholder: string}) {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      id={name}
      instanceId={name}
      name={name}
      required
      styles={{
        container: (baseStyles, _) => ({
          ...baseStyles,
          width: '100%',
          height: '48px',
        }),
        placeholder: (baseStyles, _) => ({
          ...baseStyles,
          fontSize: '14px',
          color: '#ADADAD',
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: '#2E2E2E',
          border: 'none',
          height: '48px',
          boxShadow: state.isFocused ? '0px 0px 6px #FFFFF' : 'none',
          '&:focus': {
            boxShadow: 'none',
            border: '1px solid red',
            outline: '1px solid red',
          },
        }),
        indicatorSeparator: (baseStyles, _) => ({
          ...baseStyles,
          display: 'none',
        }),
        menu: (baseStyles, _) => ({
          ...baseStyles,
          marginTop: 0,
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral80: 'white',
        },
      })}
    />
  )
}

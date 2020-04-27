import { Group } from '../types'
const findGroupName = (label: string, src: Group[]) => {
  let found
  src.forEach(group => {
      if (group.names.find(name => name === label)) {
          found = group.group
      }
  })
  return found
}

export { findGroupName }
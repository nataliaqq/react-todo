
const findGroupName = (label, src) => {
  let found
  src.forEach(group => {
      if (group.names.find(name => name === label)) {
          found = group.group
      }
  })
  return found
}

export { findGroupName }
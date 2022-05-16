import CLASSES from '../constants/classes.js'

const getCharactersByRole = characters => characters.reduce(
  (acc, c) => {
    const classRole = CLASSES[c.class]
    return { ...acc, [classRole]: [...acc[classRole], c] }
  }, { dps: [], support: [] }
)

export default getCharactersByRole

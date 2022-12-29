import { describe, expect, it } from "vitest"
import { formReducer, getAllNodesForLevel, handleChange, selectComments, selectPosts, selectUsers } from "../formReducer"

const treeOnlyLevel0 = {
  '1': {},
  '2': {},
  '3': {},
}

const treeOnlyLevel1 = {
  '1': {
    '11': {},
    '22': {},
    '33': {},
  },
  '2': {
    '44': {},
    '55': {},
    '66': {},
  },
  '3': {
    '77': {},
    '88': {},
    '99': {},
  },
}

const treeOnlyLevel2 = {
  '1': {
    '11': {
      '111': {},
      '222': {},
      '333': {},
    },
    '22': {
      '444': {},
      '555': {},
      '666': {},
    },
    '33': {
      '777': {},
      '888': {},
      '999': {},
    },
  },
  '2': {
    '44': {
      '111': {},
      '222': {},
      '333': {},
    },
    '55': {
      '444': {},
      '555': {},
      '666': {},
    },
    '66': {
      '777': {},
      '888': {},
      '999': {},
    },
  },
  '3': {
    '77': {
      '111': {},
      '222': {},
      '333': {},
    },
    '88': {
      '444': {},
      '555': {},
      '666': {},
    },
    '99': {
      '777': {},
      '888': {},
      '999': {},
    },
  },
}

describe('formReducer', () => {
  describe('getAllNodesForLevel', () => {
    describe('treeOnlyLevel0', () => {
      it('should return for treeOnlyLevel0 root nodes for level 0 and no parent getter', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel0, 0)
        expect(parentGeter).toStrictEqual([])
        expect(nodes[0]).toBe(treeOnlyLevel0)
      })

      it('should return for treeOnlyLevel0 no nodes for level 1 with parent getters from level 0', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel0, 1)
        expect(parentGeter[0]()).toBe(treeOnlyLevel0)
        expect(nodes).toStrictEqual([{}, {}, {},])
      })

      it('should return for treeOnlyLevel0 no nodes for level 2 with parent getters from level 1', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel0, 2)
        expect(parentGeter).toStrictEqual([])
        expect(nodes).toStrictEqual([])
      })
    })

    describe('treeOnlyLevel1', () => {
      it('should return for treeOnlyLevel1 root nodes for level 0 and no parent getter', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel1, 0)
        expect(parentGeter).toStrictEqual([])
        expect(nodes).toStrictEqual([treeOnlyLevel1])
        expect(nodes[0]).toBe(treeOnlyLevel1)
      })

      it('should return for treeOnlyLevel1 level 1 nodes for level 1 with parent getters from level 0', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel1, 1)
        expect(nodes[0]).toBe(treeOnlyLevel1['1'])
        expect(nodes[1]).toBe(treeOnlyLevel1['2'])
        expect(nodes[2]).toBe(treeOnlyLevel1['3'])
        expect(parentGeter[0]()).toBe(treeOnlyLevel1)
      })

      it('should return for treeOnlyLevel1 no nodes for level 2 with correct parent getters from level 1', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel1, 2)
        expect(nodes).toStrictEqual([{}, {}, {}, {}, {}, {}, {}, {}, {},])
        expect(parentGeter[0]()).toBe(treeOnlyLevel1['1'])
        expect(parentGeter[1]()).toBe(treeOnlyLevel1['1'])
        expect(parentGeter[2]()).toBe(treeOnlyLevel1['1'])
        expect(parentGeter[3]()).toBe(treeOnlyLevel1['2'])
        expect(parentGeter[4]()).toBe(treeOnlyLevel1['2'])
        expect(parentGeter[5]()).toBe(treeOnlyLevel1['2'])
        expect(parentGeter[6]()).toBe(treeOnlyLevel1['3'])
        expect(parentGeter[7]()).toBe(treeOnlyLevel1['3'])
        expect(parentGeter[8]()).toBe(treeOnlyLevel1['3'])
      })
    })

    describe('treeOnlyLevel2', () => {
      it('should return for treeOnlyLevel2 root nodes for level 0 and no parent getter', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel2, 0)
        expect(parentGeter).toStrictEqual([])
        expect(nodes).toStrictEqual([treeOnlyLevel2])
        expect(nodes[0]).toBe(treeOnlyLevel2)
      })

      it('should return for treeOnlyLevel2 level 1 nodes for level 1 with parent getters from level 0', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel2, 1)
        expect(nodes[0]).toBe(treeOnlyLevel2['1'])
        expect(nodes[1]).toBe(treeOnlyLevel2['2'])
        expect(nodes[2]).toBe(treeOnlyLevel2['3'])
        expect(parentGeter[0]()).toBe(treeOnlyLevel2)
      })

      it('should return for treeOnlyLevel2 level 2 for level 2 with correct parent getters from level 1', () => {
        const [nodes, parentGeter] = getAllNodesForLevel(treeOnlyLevel2, 2)
        expect(nodes[0]).toBe(treeOnlyLevel2['1']['11'])
        expect(nodes[1]).toBe(treeOnlyLevel2['1']['22'])
        expect(nodes[2]).toBe(treeOnlyLevel2['1']['33'])
        expect(nodes[3]).toBe(treeOnlyLevel2['2']['44'])
        expect(nodes[4]).toBe(treeOnlyLevel2['2']['55'])
        expect(nodes[5]).toBe(treeOnlyLevel2['2']['66'])
        expect(nodes[6]).toBe(treeOnlyLevel2['3']['77'])
        expect(nodes[7]).toBe(treeOnlyLevel2['3']['88'])
        expect(nodes[8]).toBe(treeOnlyLevel2['3']['99'])

        expect(parentGeter[0]()).toBe(treeOnlyLevel2['1'])
        expect(parentGeter[1]()).toBe(treeOnlyLevel2['1'])
        expect(parentGeter[2]()).toBe(treeOnlyLevel2['1'])
        expect(parentGeter[3]()).toBe(treeOnlyLevel2['2'])
        expect(parentGeter[4]()).toBe(treeOnlyLevel2['2'])
        expect(parentGeter[5]()).toBe(treeOnlyLevel2['2'])
        expect(parentGeter[6]()).toBe(treeOnlyLevel2['3'])
        expect(parentGeter[7]()).toBe(treeOnlyLevel2['3'])
        expect(parentGeter[8]()).toBe(treeOnlyLevel2['3'])
      })
    })
  })

  describe('formReducer', () => {
    it('should append new value 1', () => {
      expect(formReducer(treeOnlyLevel2, handleChange({
        id: '0',
        level: 0,
        parentId: null
      }))).toMatchInlineSnapshot(`
              {
                "0": {},
                "1": {
                  "11": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "22": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "33": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "2": {
                  "44": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "55": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "66": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "3": {
                  "77": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "88": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "99": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
              }
            `)
    })

    it('should append new value 2', () => {
      expect(formReducer(treeOnlyLevel2, handleChange({
        id: '10',
        level: 1,
        parentId: '1'
      }))).toMatchInlineSnapshot(`
              {
                "1": {
                  "10": {},
                  "11": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "22": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "33": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "2": {
                  "44": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "55": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "66": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "3": {
                  "77": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "88": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "99": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
              }
            `)
    })

    it('should append new value 3', () => {
      expect(formReducer(treeOnlyLevel2, handleChange({
        id: '100',
        level: 2,
        parentId: '11'
      }))).toMatchInlineSnapshot(`
              {
                "1": {
                  "11": {
                    "100": {},
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "22": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "33": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "2": {
                  "44": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "55": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "66": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "3": {
                  "77": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "88": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "99": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
              }
            `)
    })

    it('should remove value and all children 1', () => {
      expect(formReducer(treeOnlyLevel2, handleChange({
        id: '1',
        level: 0,
        parentId: null
      }))).toMatchInlineSnapshot(`
              {
                "2": {
                  "44": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "55": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "66": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "3": {
                  "77": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "88": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "99": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
              }
            `)
    })

    it('should remove value and all children 2', () => {
      expect(formReducer(treeOnlyLevel2, handleChange({
        id: '11',
        level: 1,
        parentId: '1'
      }))).toMatchInlineSnapshot(`
              {
                "1": {
                  "22": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "33": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "2": {
                  "44": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "55": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "66": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "3": {
                  "77": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "88": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "99": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
              }
            `)
    })

    it('should remove value and all children 3', () => {
      expect(formReducer(treeOnlyLevel2, handleChange({
        id: '111',
        level: 2,
        parentId: '11'
      }))).toMatchInlineSnapshot(`
              {
                "1": {
                  "11": {
                    "222": {},
                    "333": {},
                  },
                  "22": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "33": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "2": {
                  "44": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "55": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "66": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
                "3": {
                  "77": {
                    "111": {},
                    "222": {},
                    "333": {},
                  },
                  "88": {
                    "444": {},
                    "555": {},
                    "666": {},
                  },
                  "99": {
                    "777": {},
                    "888": {},
                    "999": {},
                  },
                },
              }
            `)
    })
  })

  describe('selectors', () => {
    it('should returns all users', () => {
      expect(selectUsers(treeOnlyLevel2)).toStrictEqual(['1', '2', '3'])
    })
    it('should returns all posts', () => {
      expect(selectPosts(treeOnlyLevel2)).toStrictEqual(['11', '22', '33', '44', '55', '66', '77', '88', '99'])
    })
    it('should returns all comments', () => {
      expect(selectComments(treeOnlyLevel2)).toStrictEqual(['111', '222', '333', '444', '555', '666', '777', '888', '999', '111', '222', '333', '444', '555', '666', '777', '888', '999', '111', '222', '333', '444', '555', '666', '777', '888', '999'])
    })
  })
})
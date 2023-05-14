import produce from "immer";

type Id = string;

export type FormTree = {
    [key: Id]: FormTree
}

export const initialValues: FormTree = {};

type PayloadLevel1AndMore = {
    id: Id;
    level: number;
    parentId: string;
};

type PayloadLevel0 = {
    id: Id;
    level: 0;
    parentId: null;
};

export const handleChange = (payload: PayloadLevel1AndMore | PayloadLevel0) => ({
    type: 'CHANGE_VALUE' as const,
    payload
}) as const

type Actions = ReturnType<typeof handleChange>

export const getAllNodesForLevelAndParentGetters = (tree: FormTree, level: number): [FormTree[], (() => FormTree)[]] => {
    // If we're at the root level, there are no children, so just return the root node
    if (level === 0) return [[tree], []]

    // A list of all nodes at the current level
    const nodes: FormTree[] = []

    // A list of functions for getting the parent of each node at the current level
    const parentGetters: (() => FormTree)[] = []

    // Traverse the tree, starting at the root and going down one level at a time
    const traverse = (tree: FormTree, level: number) => {
        // For each node in the current level...
        Object.keys(tree).forEach((key) => {
            const node = tree[key];

            // If the current level is 1, add the child node to the nodes array and add a getter for the parent node to the parentGetters array
            if (level === 1) {
                nodes.push(node)
                parentGetters.push(() => tree)
            } else {
                // Otherwise, traverse the child node
                traverse(node, level - 1)
            }
        })
    }
    traverse(tree, level)

    return [nodes, parentGetters]
}

const isParentId = (parentId: string | null): parentId is string => parentId !== null
const isRootNode = (level: number, parentId: string | null) => level === 0 || parentId === null

export const formReducer = (state: FormTree, action: Actions): FormTree => {
    switch (action.type) {
        case "CHANGE_VALUE":
            return produce(state, draft => {
                const { id, parentId, level } = action.payload // get the id, parentId, and level from the action payload
                const [nodes, parentsGetters] = getAllNodesForLevelAndParentGetters(draft, level) // get all the nodes for the level specified by the action payload
                const node = nodes.find(node => node[id]) // find the node with the id specified by the action payload
                if (node) { // if the node exists, we want to delete it
                    delete node[id] // delete the node
                    return draft; // return the draft
                }

                if (isRootNode(level, parentId)) { // if the level is 0, which means the node is a root node
                    draft[id] = {} // set the draft node with the id specified by the action payload to an empty object
                    return draft; // return the draft
                }
                if (!isParentId(parentId)) return draft; // if the parentId is null, return the draft

                parentsGetters.forEach(getParent => { // for each parent getter
                    const parent = getParent() // get the parent
                    if (Object.keys(parent).includes(parentId)) { // if the parent has the parentId specified by the action payload
                        parent[parentId][action.payload.id] = {} // set the parent node with the id specified by the action payload to an empty object
                    }
                })
                return draft; // return the draft
            })
        default:
            return state;
    }
}

const getAllNodesForLevel = (tree: FormTree, level: number): FormTree[] => getAllNodesForLevelAndParentGetters(tree, level)[0]
const flattenNodes = (nodes: FormTree) => Object.keys(nodes)
const selectNodes = (state: FormTree, level: number) => getAllNodesForLevel(state, level)

export const selectUsers = (state: FormTree, level = 0) => selectNodes(state, level).flatMap(flattenNodes)
export const selectPosts = (state: FormTree, level = 1) => selectNodes(state, level).flatMap(flattenNodes)
export const selectComments = (state: FormTree, level = 2) => selectNodes(state, level).flatMap(flattenNodes)

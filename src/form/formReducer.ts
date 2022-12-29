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

export const getAllNodesForLevel = (tree: FormTree, level: number): [FormTree[], (() => FormTree)[]] => {
    if (level === 0) return [[tree], []]
    const nodes: FormTree[] = []
    const parentGetters: (() => FormTree)[] = []
    const traverse = (tree: FormTree, level: number) => {
        Object.keys(tree).forEach((key) => {
            const node = tree[key];
            if (level === 1) {
                nodes.push(node)
                parentGetters.push(() => tree)
            } else {
                traverse(node, level - 1)
            }
        })
    }
    traverse(tree, level)
    return [nodes, parentGetters]
}

export const formReducer = (state: FormTree, action: Actions): FormTree => {
    switch (action.type) {
        case "CHANGE_VALUE":
            return produce(state, draft => {
                const { id, parentId, level } = action.payload
                const [nodes, parentsGetters] = getAllNodesForLevel(draft, level)
                const node = nodes.find(node => node[id])
                if (node) {
                    delete node[id]
                    return draft;
                }

                if (level === 0) {
                    draft[id] = {}
                    return draft;
                }

                if (parentId === null) {
                    draft[id] = {}
                    return draft;
                }

                parentsGetters.forEach(getParent => {
                    const parent = getParent()
                    if (Object.keys(parent).includes(parentId)) {
                        parent[parentId][action.payload.id] = {}
                    }
                })
                return draft;
            })
        default:
            return state;
    }
}

export const selectUsers = (state: FormTree) => getAllNodesForLevel(state, 0)[0].flatMap((node) => Object.keys(node))
export const selectPosts = (state: FormTree) => getAllNodesForLevel(state, 1)[0].flatMap((node) => Object.keys(node))
export const selectComments = (state: FormTree) => getAllNodesForLevel(state, 2)[0].flatMap((node) => Object.keys(node))

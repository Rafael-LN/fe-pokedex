import {useReducer, useEffect, Reducer} from "react";
import axios, { AxiosRequestConfig } from "axios";

// Define action types
enum ACTIONS {
    FETCH_PENDING = "FETCH_PENDING",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR"
}

type PayloadData<T> = {
    data: T;
}

type PayloadError = {
    error: string;
}

// Define the union type for all actions
type FetchAction<T> = {
    type: ACTIONS.FETCH_PENDING | ACTIONS.FETCH_SUCCESS | ACTIONS.FETCH_ERROR;
    payload?: PayloadData<T> | PayloadError;
};

// Define the state interface
type FetchState<T> = {
    error?: string;
    isLoading: boolean;
    data?: T;
}

// Create initial state function with type parameter
function createInitialState <T>(initialState: T): FetchState<T>{
    return {
        error: undefined,
        isLoading: true,
        data: undefined,
        ...initialState
    } as FetchState<T>
}

// Define fetch reducer
function fetchReducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {
    switch (action.type) {
        case ACTIONS.FETCH_PENDING:
            return { ...state, isLoading: true, error: undefined };
        case ACTIONS.FETCH_SUCCESS:
            return { ...state, ...action.payload, isLoading: false };
        case ACTIONS.FETCH_ERROR:
            return { ...state, ...action.payload, isLoading: false };
        default:
            throw new Error("Not recognized action type in fetchReducer! Typo?");
    }
}


type FetchReducer<T> = Reducer<FetchState<T>, FetchAction<T>>;

export function useApi<T>(endpoint: string, initialState: T = {} as T, config: AxiosRequestConfig = {}): FetchState<T> {
    const [state, dispatch] = useReducer<FetchReducer<T>>(fetchReducer, createInitialState(initialState));

    useEffect(() => {
        if (!endpoint) {
            throw new Error("Please provide an endpoint to use this hook!");
        }

        const fetchData = async () => {
            dispatch({ type: ACTIONS.FETCH_PENDING });

            try {
                const { data } = await axios.get<T>(endpoint, config);
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
            } catch (e) {
                dispatch({
                    type: ACTIONS.FETCH_ERROR,
                    payload: { error: (e as Error).message || "Something went wrong" }
                });
            }
        };

        fetchData();
    }, [endpoint, config]);

    return state;
}



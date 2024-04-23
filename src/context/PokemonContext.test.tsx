import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import PokemonProvider, { usePokemonContext } from './PokemonsContext';
import { pokeApi } from '../services/pokeApi';

jest.mock('../services/pokeApi');

describe('PokemonProvider', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    test('provides initial context values', () => {
        const wrapper: React.FC = ({ children }) => (
            <PokemonProvider>{children}</PokemonProvider>
        );

        const { result } = renderHook(() => usePokemonContext(), { wrapper });

        // Check if initial context values are provided correctly
        expect(result.current.pokemons).toEqual([]);
        expect(result.current.hasMorePokemon).toBeFalsy();
        expect(result.current.isPokedex).toBeFalsy();
        expect(result.current.pokemonTypes).toEqual([]);
        expect(result.current.allPokemonsCount).toEqual(0);
        expect(typeof result.current.fetchNextPage).toBe('function');
        expect(typeof result.current.updatePokemonDetails).toBe('function');
        expect(typeof result.current.setIsPokedex).toBe('function');
    });

    test('fetches Pokémon data', async () => {
        // Mocking API response
        const mockPokemons = [
            { id: 1, name: 'Bulbasaur', types: [], height: 7, stats: [], caughtDate: null, note: null },
            { id: 2, name: 'Ivysaur', types: [], height: 10, stats: [], caughtDate: null, note: null }
        ];
        const mockResponse = { results: mockPokemons };
        mock.onGet('/pokemon').reply(200, mockResponse);

        const wrapper: React.FC = ({ children }) => (
            <PokemonProvider>{children}</PokemonProvider>
        );

        const { result, waitForNextUpdate } = renderHook(() => usePokemonContext(), { wrapper });

        // Check if initial context values are provided correctly before fetching data
        expect(result.current.pokemons).toEqual([]);
        expect(result.current.hasMorePokemon).toBeFalsy();

        // Trigger the fetch
        act(() => {
            result.current.fetchNextPage();
        });

        // Wait for the state to be updated
        await waitForNextUpdate();

        // Check if data is fetched and updated correctly
        expect(result.current.pokemons).toEqual(mockPokemons);
        expect(result.current.hasMorePokemon).toBeTruthy();
    });

    test('updates Pokémon details', async () => {
        // Mocking API response for fetching initial Pokémon data
        const mockInitialPokemons = [{ id: 1, name: 'Bulbasaur', caught: false }];
        const mockInitialResponse = { data: { results: mockInitialPokemons } };
        mock.onGet('/pokemon/Bulbasaur').reply(200, mockInitialResponse);

        // Render the hook
        const wrapper: React.FC = ({ children }) => (
            <PokemonProvider>{children}</PokemonProvider>
        );
        const { result, waitForNextUpdate } = renderHook(() => usePokemonContext(), { wrapper });

        // Wait for the initial data to be fetched
        await waitForNextUpdate();

        // Check if initial Pokémon is not caught
        expect(result.current.pokemons[0].caught).toBeFalsy();

        // Mocking API response for updating Pokémon details
        const updatedPokemon = { ...mockInitialPokemons[0], caught: true };
        const mockUpdatedResponse = { data: updatedPokemon };
        mock.onPut('/pokemon/Bulbasaur').reply(200, mockUpdatedResponse);

        // Update Pokémon details
        act(() => {
            result.current.updatePokemonDetails('Bulbasaur', true);
        });

        // Wait for the state to be updated
        await waitForNextUpdate();

        // Check if Pokémon details are updated correctly
        expect(result.current.pokemons[0].caught).toBeTruthy();
    });
});

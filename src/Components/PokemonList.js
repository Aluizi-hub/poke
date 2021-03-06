/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _, { toUpper } from 'lodash';
import { GetPokemonList } from "../Actions/PokemonActions";
import ErrorConexion from '../Assets/error.png';
import PikachuError from "../Assets/pikachuError.png";
import {Link} from "react-router-dom";
import Search from "../Assets/search.png";
import ReactPaginate from 'react-paginate';



const PokemonList = (props) => {
    const [search, setSearch] = useState('');
    const dispacht = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);

    useEffect(()=> {
        fecthData(1);
    }, []);


    const fecthData = (page = 1 ) => {
        dispacht(GetPokemonList(page))
    }

    const showData = () => {
        if(pokemonList.loading) {
            return <div className='screenInformation'>
                <img src='https://fontmeme.com/permalink/210130/72be44b74b45e99113b2f860661517c8.png' border="0" alt='Carregando'/>
            </div>
        }
        if(!_.isEmpty(pokemonList.data)) {
            return (
                <div className='list'>
                    {pokemonList.data.map(e => {
                return (
                <div className='pokemon-item'>
                    <p className='item'>{toUpper(e.name)}</p>
                    <Link to={`/pokemon/${e.name}`} key={e.id}><img src="https://fontmeme.com/permalink/210130/84aa43bdb1d4abb877d355b7db163ab7.png" alt="Ver mais" border="0"/></Link>
                </div>
                )             
            })}
                </div>
            )
            
        }
  
        if(pokemonList.errorMsg !== "") {
            return <div className='screenInformation'>
            <img src={ErrorConexion} alt="falha de conexão" border="0"/>
            <img className='imgError' src={PikachuError} alt="falha de conexão" border="0"/>
        </div>    
        }

        return <div className='screenInformation'>
                <img src={ErrorConexion} alt="falha de conexão" border="0"/>
                <img className='imgError' src={PikachuError} alt="falha de conexão" border="0"/>
            </div>        
    }

    return (
        <div>
            <div className='search-wrapper'>
                <input type='text' onChange={e => setSearch(e.target.value)} placeholder='Pesquisar'/>
                <a onClick={() => props.history.push(`/pokemon/${search}`)}><img src={Search} alt='Pesquisar' /></a>

            </div>
                <img className='logo' src="https://fontmeme.com/permalink/210130/9d6ad5399ee8fb50083faf7094eb8eab.png" alt="fonte-de-pokemon" border="0"/>        {showData()}
             
                 <div>{showData()}
                {!_.isEmpty(pokemonList.data) && (
                    <ReactPaginate
                        pageCount={Math.ceil(pokemonList.count / 15)}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        onPageChange={(data) => fecthData(data.selected + 1)}
                        containerClassName={"pagination"}
                        nextLabel={'Próximo'}
                        previousLabel={'Anterior'}
                    />
        )}
        </div>
        </div>
    )
};

export default PokemonList;

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Outing, { IOuting, IOutingUpdParams } from 'src/data/outings';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'clear':
      return {
        page: 0
      };
    case 'filter':
      return {
        ...state,
        ...action.payload,
        page: 0
      };

    case 'paginate':
      return {
        ...state,
        page: state.page + 1
      }
    default:
      return state;
  }
}

const useOutings = () => {
  const foo = useParams();
  let { outingId } = useParams();

  const [outing, setOuting] = useState();
  const [outings, setOutings] = useState([]);

	const [searchState, searchDispatch] = useReducer(reducer, {});

  const updateOuting = (id: number, params: IOutingUpdParams) => {
    const res: IOuting | undefined = Outing.updateOuting(id, params);
    if (res) {
      const ot = outings.find((ot: IOuting) => ot.id === id);
      if (!ot)
        return;

      Object.keys(res).forEach(
        key => (ot[key as keyof object] = res[key as keyof object])
      );
      setOuting(ot);
      setOutings([...outings]);
      return res;
    }
  }

  const doSearch = (field: string, val: any) => {
		searchDispatch({ type: 'filter', payload: { [field]: val } });
	};

	const clearSearch = () => {
		searchDispatch({ type: 'clear' });
	};

  const paginate = () => {
    searchDispatch({ type: 'paginate' });
  }

  const getOutings = useCallback(async () => {
    const res =  await Outing.fetchOutings(searchState);
    console.log({ res })
    if (res)
      setOutings(res);
  }, [searchState]);

  const getOuting = useCallback(async () => {
    const res =  await Outing.fetchOuting(outingId);
    console.log({ resto: res })
    if (res)
      setOuting(res);
  }, [outingId]);

  useEffect(() => {
    console.log({ outingId })
    if (outingId) {
      getOuting();
    } else {
      setOuting(undefined);
    }
  }, [getOuting, outingId]);

  useEffect(() => {
    getOutings();
  }, [getOutings]);

  return { outings, outing, doSearch, clearSearch, paginate, updateOuting };
};

export default useOutings;
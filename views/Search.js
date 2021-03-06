import Header from './components/Header.js';
import Input from './components/Input.js';
import ListItem from './components/ListItem.js';
import Button from './components/Button.js';

import result from '../mocks/routeData.js';

const Search = () => {

  let lastSelectedId = 'item-1';

  const onSearchClick = () => {
    if (document.getElementById('search-start').value && document.getElementById('search-end').value) {
      document.querySelector('.search-result-container').innerHTML = items.map((item) => {
        return item.render;
      }).join('\n')
      items.map((item) => {
        return item.afterRender();
      })
      return;
    }
    alert('Please Enter Start and Destination');
  };

  const onConfirmRide = () => {
    const element = document.getElementById(lastSelectedId);
    element.classList.remove('selected-item');
    element.style = 'background: #9999ff; color: white';
    element.getElementsByClassName('item-result-icon')[0].innerHTML = 'check_circle';
    element.getElementsByClassName('search-result-rating')[0].innerHTML = `<span class="material-icons item-result-icon-call">call</span>`;
    
  };

  const onListItemClick = (id) => () => {
    document.getElementById('confirm-btn').style = 'display: inherit';
    document.getElementById(lastSelectedId).classList.remove('selected-item');
    document.getElementById(id).classList.add('selected-item');
    lastSelectedId = id;
  };

  const header = Header('LOGIN TO APP');
  const start = Input('Start From', 'search-start');
  const end = Input('Destination', 'search-end');

  const search = Button('Search', onSearchClick, 'search-btn');
  const confirm = Button('Confirm Ride', onConfirmRide, 'confirm-btn');

  const items = result.map((item) => {
    return ListItem(item, onListItemClick);
  })

  return{
    render: `
    ${header.render}
    <div class="search-container">
      <section class="search-input-container">
        <div class="search-start-container">
          ${start.render}
        </div>
        <div class="search-end-container">
          ${end.render}
        </div>
      </section>
      ${search.render}
      <section class="search-result-container">
      </section>
      ${confirm.render}
    </div>
  `,
    afterRender: () => {
      start.afterRender();
      end.afterRender();
      search.afterRender();
      confirm.afterRender();
    }
  }
};

export default Search;

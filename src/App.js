import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [rate, setRate] = useState(0.1);
  const [qty, setQty] = useState(0.1);
  const [vegetables, setVegetables] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);

  function handleName(event) {
    setName(event.target.value);
  }

  function handleRate(event) {
    setRate(event.target.value);
  }

  function handleQty(event) {
    setQty(event.target.value);
  }

  function handleAddOrUpdateItem() {
    if (currentEditId !== null) {
      // Update existing item
      setVegetables((prev) =>
        prev.map((item) =>
          item.id === currentEditId
            ? { ...item, name, rate: parseFloat(rate), qty: parseFloat(qty) }
            : item
        )
      );
      setCurrentEditId(null);
    } else {
      // Add new item
      setVegetables((prev) => [
        ...prev,
        { id: prev.length + 1, name, rate: parseFloat(rate), qty: parseFloat(qty) },
      ]);
    }
    setName('');
    setRate(0.1);
    setQty(0.1);
  }

  function handleEditItem(id) {
    const item = vegetables.find((item) => item.id === id);
    if (item) {
      setName(item.name);
      setRate(item.rate);
      setQty(item.qty);
      setCurrentEditId(id);
    }
  }

  function handleDeleteItem(id) {
    setVegetables((prev) => prev.filter((item) => item.id !== id));
  }

  let total = vegetables.reduce((sum, item) => sum + item.rate * item.qty, 0);

  return (
    <div className='container'>
      <h1 className='my-4'>Vegetables List</h1>
      <div className='mb-3'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={handleName}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Rate</label>
        <input
          type='number'
          className='form-control'
          value={rate}
          onChange={handleRate}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Quantity</label>
        <input
          type='number'
          className='form-control'
          value={qty}
          onChange={handleQty}
        />
      </div>
      <button
        className={`btn ${currentEditId !== null ? 'btn-warning' : 'btn-primary'}`}
        onClick={handleAddOrUpdateItem}
      >
        {currentEditId !== null ? 'Update Item' : 'Add Item'}
      </button>

      <h2 className='my-4'>Items</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vegetables.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.rate}</td>
              <td>{item.qty}</td>
              <td>{(item.rate * item.qty).toFixed(2)}</td>
              <td>
                <button
                  className='btn btn-success btn-sm me-2'
                  onClick={() => handleEditItem(item.id)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='4'>Grand Total</td>
            <td colSpan='2'>{total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;

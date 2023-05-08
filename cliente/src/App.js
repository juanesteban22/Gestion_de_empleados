import './App.css';
import {useState} from 'react'
import  Axios  from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


function App() {

  const [nombre,setNombre]= useState ('');
  const [edad,setEdad]= useState ();
  const [pais,setPais]= useState ('');
  const [cargo,setCargo]= useState ('');
  const [años,setAños]= useState ();
  const [id,setId]= useState ();

  const [editar,setEditar] = useState (false);
  const [empleadosList,setEmpleados] = useState ([]);

  const add = ()=>{
    Axios.post('http://localhost:3001/create',{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      años:años
    }).then(()=>{
      alert('Empleado registrado')
      getEmpleados();
      LimpiarCampos();
      Swal.fire({
        title: '<strong>Registro exitoso!</strong>',
        html: '<i>El empleado <strong>'+nombre+'</strong> fue registrado con exito!!</i>',
        icon: 'success',
        timer:5000
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',

          text:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        })
      })
    });
  }

  const update = ()=>{
    Axios.put('http://localhost:3001/update',{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      años:años
    }).then(()=>{
     getEmpleados();
     LimpiarCampos();
     Swal.fire({
      title: '<strong>Actualizacion exitosa!</strong>',
      html: '<i>El empleado <strong>'+nombre+'</strong> fue actualizado con exito!!</i>',
      icon: 'success',
      timer:5000
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    })
    });
  }

  const deleteEmple = (val)=>{
    Swal.fire({
      title: 'Confirmar eliminado',
      html: '<i>Realmente desea eliminar a <strong>'+val.nombre+'</strong> ?!!</i>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getEmpleados();
          LimpiarCampos();
          Swal.fire({
            position:'top-end',
            icon:'success',
            title:val.nombre+'Fue eliminado',
            showCancelButton:false,
            //timer:2000
          }).catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
    
              text:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            })
          })
         });
      }
    });
  }

  const LimpiarCampos = ()=>{
    setAños('');
    setCargo('');
    setNombre('');
    setEdad('');
    setPais('');
    setId('');
    setEditar(false);
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre)
    setEdad(val.edad)
    setCargo(val.cargo)
    setPais(val.pais)
    setAños(val.años)
    setId(val.id)

  }

  const getEmpleados= ()=>{
    Axios.get('http://localhost:3001/empleados').then((response)=>{
      setEmpleados(response.data);
    });
  }
  getEmpleados();

  
  return (
    <div className="container">
          <div className="card text-center">
        <div className="card-header">
          Gestion de empleados
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input onChange={(event)=>{
          setNombre(event.target.value);
        }} 
        value={nombre} type="text" className="form-control" placeholder="Nombre de usuario" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input onChange={(event)=>{
          setEdad(event.target.value);
        }} 
        value={edad} type="number" className="form-control" placeholder="Edad usuario" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Pais:</span>
          <input onChange={(event)=>{
          setPais(event.target.value);
        }} 
        value={pais} type="text" className="form-control" placeholder="Pais usuario" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">cargo:</span>
          <input onChange={(event)=>{
          setCargo(event.target.value);
        }} 
        value={cargo}type="text" className="form-control" placeholder="Cargo usuario" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Años:</span>
          <input onChange={(event)=>{
          setAños(event.target.value);
        }} 
        value={años}type="number" className="form-control" placeholder="Años Experienza" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar===true?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={LimpiarCampos}>Canselar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-striped">
            <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope='col'> Cargo</th>
            <th scope='col'> Experienza</th>
            <th scope='col'> Acciones</th>
          </tr>
        </thead>
        <tbody>
        {
          empleadosList.map((val,key)=>{
            return (
                <tr key={val.id}>
                <th >{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.años}</td>
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                  onClick={()=>{
                    editarEmpleado(val)
                  }}
                  className="btn btn-info">Editar</button>
                  <button type="button" onClick={()=>{
                    deleteEmple(val);
                  }} className="btn btn-danger">Eliminar</button>
                </div>
                </td>
              </tr>
              //<div key={key}>{val.nombre}</div>
            )
          })
        }
        </tbody>
      </table>

    </div>
  );
}
/* ejercicio sin bostratp tenes que hacerlo con css no mas
nada de boostrap

<div className="App">
     <div className='datos'>
      <label>
        Nombre:<input onChange={(event)=>{
          setNombre(event.target.value);
        }} type ='text'/>
      </label><br/>
      <label>
        Edad:<input onChange={(event)=>{
          setEdad(event.target.value);
        }} type ='number'/>
      </label><br/>
      <label>
        Pais:<input onChange={(event)=>{
          setPais(event.target.value);
        }} type ='text'/>
      </label><br/>
      <label>
        Carga:<input onChange={(event)=>{
          setCargo(event.target.value);
        }} type ='text'/>
      </label><br/>
      <label>
        Años:<input onChange={(event)=>{
          setAños(event.target.value);
        }} type ='number'/>
      </label><br/>
      <button onClick={add}>Registrar</button>
      </div>
      <div className='lista'>
        <button onClick={getEmpleados}>Listar</button>
        {
          empleadosList.map((val,key)=>{
            return (
              <div key={key}>{val.nombre}</div>
            )
          })
        }
     </div>
    </div>*/

export default App;

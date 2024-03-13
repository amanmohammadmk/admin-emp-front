import { BASE_URL } from "./baseurl";
import { commonApi } from "./commonapi";



// login
export const login=async(body,header)=>{

  return await  commonApi("POST",`${BASE_URL}/login`,body,header)

}
// add employe

export const addUser=async(body,header)=>{

  return await  commonApi("POST",`${BASE_URL}/add`,body,header)

}


// get all employee

export const getUsers=async(search)=>{

  return await  commonApi("GET",`${BASE_URL}/get/allusers?search=${search}`,"")

}


// delete

export const deleteUser=async(id)=>{

  return await  commonApi("DELETE",`${BASE_URL}/delete/user/${id}`,{})

}


// edit

export const editUser=async(id,body,header)=>{

  return await  commonApi("PUT",`${BASE_URL}/edit/user/${id}`,body,header)

}
function Login(){

    return(
        <div style={{marginRight:'30%', marginLeft:'30%'}} >
            <h1>Log in to proceed</h1>
            <input type="text" id="UserName" />
            <input type="text" id="PassWord" password />
            <button type="submit" >Submit</button>
        </div>
    );
}

export default Login
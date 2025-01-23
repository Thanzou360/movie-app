import Movie from "@/components/Movie";


export default function Addmovie() {



  return <>
    <div className="addblogpage container">
      <div className="blogadd">
        <div className="titledashboard w-100 flex flex-sb">
          <div>
            <h2>Add Movie</h2>
            <h3>Admin panel</h3>
          </div>
        </div>
        <Movie/>
      </div>
    </div>
  </>

}
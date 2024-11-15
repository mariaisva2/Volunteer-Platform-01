import { Button } from "@mui/joy"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen  flex flex-col">
      {/* Header */}
      <header className="p-7 flex justify-between items-center ">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-700">VolunteerConecct</h1>
        </div>
        <div className="flex gap-2 ">
          <Link href="/login"><Button sx={{ "color": "black", "fontSize": "1em" }} variant="plain"> Iniciar session </Button></Link>
          <Link href="/register"><Button
            sx={{
              "color": "white", "bgcolor": "black", "fontSize": "1em",
              "&: hover": {
                backgroundColor: 'black',
              }
            }} variant="solid"> Registrarse </Button></Link>
        </div>

      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col items-center justify-center p-4 gap-6">
        <h1 className="font-bold text-[3em]">Conecta, Colabora, Cambia el mundo </h1>
        <p className="w-[40%] text-[1.2em] flex text-center ">Unete a nuestra comunidad de voluntarios y organizadores. Encuentra
          proyectos que te apacionen o crea los tuyos propios para hacer una
          diferencia en tu  comunidad.
        </p>
        <div className="flex gap-4">
          <Link href="/login" >
          <Button size="lg" sx={{
            "bgcolor": "black",
            "&: hover": {
              backgroundColor: 'black'
            }
          }} > Explora Proyectos </Button></Link>
          <Link href="/login">
          <Button size="lg" sx={{
            "bgcolor": "white", "color": "black",
            "&: hover": {
              backgroundColor: 'white'
            }
          }} > Comenzar como organizador </Button></Link>
        </div>
      </main>

    </div>
  )
}
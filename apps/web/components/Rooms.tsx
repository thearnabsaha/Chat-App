import { Button } from "@workspace/ui/components/button"

const Rooms = () => {
  return (
    <div className=" overflow-auto">
        <div className="flex justify-between items-center p-5 w-[38vw] border mx-[1vw] my-5 rounded-md border-ring">
            <h1 className="text-xl font-bold">Room No. 3D4D5S</h1>
            <div className="space-x-3">
                <Button className="bg-destructive text-white">Delete</Button>
                <Button className="bg-chart-2 text-white">Join</Button>
                <Button className="bg-chart-3 text-white">Rename</Button>
            </div>
        </div>
    </div>
  )
}

export default Rooms
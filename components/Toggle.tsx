import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabCarousel } from "./TabCarousel"
import { RoutineCarousel } from "./Routine"

export default function Toggle() {
  return (
    <div className="flex justify-center items-center w-full">
      <Tabs defaultValue="habit" className="w-full max-w-md flex flex-col items-center">
        <TabsList className="flex justify-center items-center space-x-4">
          <TabsTrigger value="habit">Habits</TabsTrigger>
          <TabsTrigger value="routine">Routine</TabsTrigger>
        </TabsList>

        <div className="w-full mt-4">
          <TabsContent value="habit" className="flex justify-center">
            <TabCarousel />
          </TabsContent>
          <TabsContent value="routine" className="flex justify-center">
            <RoutineCarousel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

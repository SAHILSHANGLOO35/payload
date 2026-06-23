import { prisma } from "db/client"

export const migrateGuestInvoices = async (userId: string, guestId: string) => {
  const guestSession = await prisma.guestSession.findUnique({
    where: { guestId },
  })
  if (!guestSession) return

  // Reassign all guest invoices to this user
  await prisma.invoice.updateMany({
    where: { guestSessionId: guestSession.id },
    data: {
      userId,
      guestSessionId: null, // detach from guest session
    },
  })

  await prisma.guestSession.delete({ where: { id: guestSession.id } })
}

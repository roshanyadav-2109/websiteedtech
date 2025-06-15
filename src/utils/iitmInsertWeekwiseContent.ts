
/**
 * Utility for manually uploading week-wise notes & pyqs to Supabase.
 * Run this file manually (Node script or import in admin panel). NOT for production!
 */
import { supabase } from "@/integrations/supabase/client";

// EXAMPLE: Upload week-wise notes for "Mathematics for Data Science 1", Level: foundation, Branch: Data Science
async function uploadBranchNotes() {
  const notesData = [];
  const subject = "Mathematics for Data Science 1";
  const branch = "Data Science and Applications";
  const level = "foundation";
  for (let week = 1; week <= 12; week++) {
    notesData.push({
      title: `Week ${week} - ${subject}`,
      branch,
      subject,
      level,
      description: `Notes and practice for week ${week}`,
      download_count: 0,
      is_active: true,
    });
  }
  for (const note of notesData) {
    await supabase.from('notes').insert(note);
  }
}

// EXAMPLE: Uploading one pyq set
async function uploadPYQs() {
  const pyqData = [{
    title: "Quiz 1 Set A",
    year: 2023,
    branch: "Data Science and Applications",
    level: "foundation",
    exam_type: "quiz1",
    subject: "Mathematics for Data Science 1",
    is_active: true,
    download_count: 0
  }];
  for (const pyq of pyqData) {
    await supabase.from('pyqs').insert(pyq);
  }
}

export { uploadBranchNotes, uploadPYQs };

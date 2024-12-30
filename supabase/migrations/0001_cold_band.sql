/*
  # Plans and Milestones Schema

  1. New Tables
    - `plans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `target` (text)
      - `priority` (enum: low, medium, high)
      - `status` (enum: not-started, in-progress, completed)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `milestones`
      - `id` (uuid, primary key)
      - `plan_id` (uuid, references plans)
      - `title` (text)
      - `target_date` (date)
      - `completed` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create enum types
CREATE TYPE plan_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE plan_status AS ENUM ('not-started', 'in-progress', 'completed');

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  target text NOT NULL,
  priority plan_priority NOT NULL DEFAULT 'medium',
  status plan_status NOT NULL DEFAULT 'not-started',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES plans ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  target_date date NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Create policies for plans
CREATE POLICY "Users can view their own plans"
  ON plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own plans"
  ON plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plans"
  ON plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plans"
  ON plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for milestones
CREATE POLICY "Users can view milestones of their plans"
  ON milestones FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM plans 
    WHERE plans.id = milestones.plan_id 
    AND plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can create milestones for their plans"
  ON milestones FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM plans 
    WHERE plans.id = milestones.plan_id 
    AND plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can update milestones of their plans"
  ON milestones FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM plans 
    WHERE plans.id = milestones.plan_id 
    AND plans.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete milestones of their plans"
  ON milestones FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM plans 
    WHERE plans.id = milestones.plan_id 
    AND plans.user_id = auth.uid()
  ));